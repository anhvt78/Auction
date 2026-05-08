/**
 * deploy.js – Dùng viem trực tiếp, không cần hardhat-ethers plugin.
 * Chạy: node scripts/deploy.js [testnet|mainnet|local]
 *   hoặc: npx hardhat run scripts/deploy.js --network luksoTestnet  (cũng OK)
 */

require("dotenv").config({ path: ".env.local" });
const { createWalletClient, createPublicClient, http, parseEther, encodeDeployData } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const fs   = require("fs");
const path = require("path");

// ── Cấu hình mạng ─────────────────────────────────────────────────────────
const NETWORKS = {
  luksoTestnet: {
    id: 4201,
    name: "LUKSO Testnet",
    rpc: "https://rpc.testnet.lukso.network",
    symbol: "LYXt",
  },
  lukso: {
    id: 42,
    name: "LUKSO Mainnet",
    rpc: "https://rpc.mainnet.lukso.network",
    symbol: "LYX",
  },
  hardhat: {
    id: 31337,
    name: "Hardhat Local",
    rpc: "http://127.0.0.1:8545",
    symbol: "ETH",
  },
};

// Lấy mạng từ tham số CLI hoặc mặc định testnet
const netArg = process.argv[2] || "luksoTestnet";
const NET    = NETWORKS[netArg] || NETWORKS.luksoTestnet;

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!privateKey || privateKey.length < 64) {
    throw new Error("DEPLOYER_PRIVATE_KEY chưa được set trong .env.local");
  }

  const account = privateKeyToAccount(privateKey);
  console.log("Deployer address:", account.address);

  const chain = {
    id: NET.id,
    name: NET.name,
    nativeCurrency: { name: NET.symbol, symbol: NET.symbol, decimals: 18 },
    rpcUrls: { default: { http: [NET.rpc] } },
  };

  const publicClient = createPublicClient({ chain, transport: http(NET.rpc) });
  const walletClient = createWalletClient({ account, chain, transport: http(NET.rpc) });

  const balance = await publicClient.getBalance({ address: account.address });
  console.log("Balance:", (Number(balance) / 1e18).toFixed(6), NET.symbol);

  if (balance === 0n) {
    throw new Error(`Số dư = 0 ${NET.symbol}. Cần nạp thêm để trả gas.`);
  }

  // Đọc artifact đã compile
  const artifactPath = path.join(
    __dirname,
    "../artifacts/contracts/AuctionHouse.sol/AuctionHouse.json"
  );
  if (!fs.existsSync(artifactPath)) {
    throw new Error("Artifact không tồn tại. Chạy: npx hardhat compile");
  }
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

  // Constructor args: platformFeeBps=250 (2.5%), minArbitratorStake=10 LYX
  const PLATFORM_FEE_BPS     = 250n;
  const MIN_ARBITRATOR_STAKE = parseEther("10");

  // Encode deploy data (bytecode + constructor args)
  const deployData = encodeDeployData({
    abi:      artifact.abi,
    bytecode: artifact.bytecode,
    args:     [PLATFORM_FEE_BPS, MIN_ARBITRATOR_STAKE],
  });

  console.log("Deploying AuctionHouse...");
  const txHash = await walletClient.deployContract({
    abi:      artifact.abi,
    bytecode: artifact.bytecode,
    args:     [PLATFORM_FEE_BPS, MIN_ARBITRATOR_STAKE],
  });
  console.log("Tx hash:", txHash);

  console.log("Chờ xác nhận giao dịch...");
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

  if (!receipt.contractAddress) {
    throw new Error("Deploy thất bại – không có contractAddress trong receipt");
  }

  const contractAddress = receipt.contractAddress;
  console.log("✅ AuctionHouse deployed:", contractAddress);
  console.log("Gas used:", receipt.gasUsed.toString());

  // Lưu deployedContract.json
  const outDir  = path.join(__dirname, "../src/lib");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outFile = path.join(outDir, "deployedContract.json");
  fs.writeFileSync(
    outFile,
    JSON.stringify({ address: contractAddress, network: NET.name, chainId: NET.id, abi: artifact.abi }, null, 2)
  );
  console.log("📄 ABI saved to src/lib/deployedContract.json");

  // Cập nhật .env.local
  const envPath = path.join(__dirname, "../.env.local");
  let env       = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
  const key     = "NEXT_PUBLIC_CONTRACT_ADDRESS";
  const line    = `${key}=${contractAddress}`;

  env = env.includes(key)
    ? env.replace(new RegExp(`${key}=.*`), line)
    : env + `\n${line}\n`;

  fs.writeFileSync(envPath, env);
  console.log("✅ .env.local updated:", line);

  console.log("\n📋 Tiếp theo:");
  console.log("  npm run dev   →  mở http://localhost:3000");
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error("❌ Deploy thất bại:", e.message); process.exit(1); });
