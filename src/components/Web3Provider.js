'use client';
/**
 * Web3Provider.js
 * Cấu hình kết nối Blockchain hỗ trợ mạng LUKSO và Ethereum.
 * Đã khắc phục lỗi phụ thuộc @metamask/sdk bằng cách sử dụng cấu hình tùy chỉnh.
 */
import '@rainbow-me/rainbowkit/styles.css';
import { 
  RainbowKitProvider, 
  connectorsForWallets 
} from '@rainbow-me/rainbowkit';
import { 
  injectedWallet, 
  walletConnectWallet 
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { lukso, mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Khởi tạo Query Client để quản lý trạng thái các câu lệnh gọi từ Blockchain
const queryClient = new QueryClient();

// 2. Định nghĩa các ví sẽ được hỗ trợ trong danh sách kết nối
// Việc sử dụng connectorsForWallets giúp tránh việc nạp các SDK không cần thiết gây lỗi Runtime
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Được đề xuất cho LUKSO',
      wallets: [
        // Hỗ trợ window.lukso (Universal Profile Extension & Mobile App)
        injectedWallet, 
        // Hỗ trợ kết nối qua mã QR cho các ví di động khác
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: 'Blockchain Auction',
    projectId: 'YOUR_WALLET_CONNECT_ID', // Lưu ý: Thay thế bằng ID thực tế từ cloud.walletconnect.com
  }
);

// 3. Thiết lập cấu hình Wagmi
// Tích hợp RPC của LUKSO tương tự như logic trong ConnectForm.jsx
const config = createConfig({
  connectors,
  chains: [lukso, mainnet],
  ssr: true, // Bật chế độ SSR để tương thích với Next.js Turbopack
  transports: {
    // Sử dụng RPC chính thức của mạng LUKSO Mainnet
    [lukso.id]: http('https://rpc.mainnet.lukso.network'),
    [mainnet.id]: http(),
  },
});

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}