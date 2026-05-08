'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import {
  AUCTION_HOUSE_ABI,
  AUCTION_HOUSE_ADDRESS,
} from '@/lib/contracts';

const CONTRACT = { address: AUCTION_HOUSE_ADDRESS, abi: AUCTION_HOUSE_ABI };

// ─────────────────────────────────────────────────────────────────────────────
// READ HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/** Số lượng phiên đấu giá */
export function useAuctionCount() {
  const { data, isLoading, refetch } = useReadContract({
    ...CONTRACT,
    functionName: 'getAuctionCount',
  });
  return { count: data ? Number(data) : 0, isLoading, refetch };
}

/** Danh sách đấu giá phân trang */
export function useAuctionList(offset = 0, limit = 20) {
  const { data, isLoading, error, refetch } = useReadContract({
    ...CONTRACT,
    functionName: 'getAuctions',
    args: [BigInt(offset), BigInt(limit)],
  });
  return { auctions: data || [], isLoading, error, refetch };
}

/** Một phiên đấu giá cụ thể */
export function useAuction(auctionId) {
  const enabled = auctionId !== undefined && auctionId !== null;
  const { data, isLoading, error, refetch } = useReadContract({
    ...CONTRACT,
    functionName: 'getAuction',
    args: enabled ? [BigInt(auctionId)] : undefined,
    query: { enabled },
  });
  return { auction: data, isLoading, error, refetch };
}

/** Lịch sử giá thầu của một phiên */
export function useAuctionBids(auctionId) {
  const enabled = auctionId !== undefined && auctionId !== null;
  const { data, isLoading, refetch } = useReadContract({
    ...CONTRACT,
    functionName: 'getBids',
    args: enabled ? [BigInt(auctionId)] : undefined,
    query: { enabled },
  });
  return { bids: data || [], isLoading, refetch };
}

/** Danh sách ID phiên đấu giá của người bán */
export function useSellerAuctions(seller) {
  const { data, isLoading, refetch } = useReadContract({
    ...CONTRACT,
    functionName: 'getSellerAuctions',
    args: seller ? [seller] : undefined,
    query: { enabled: !!seller },
  });
  return { auctionIds: data || [], isLoading, refetch };
}

/** Danh sách ID phiên đấu giá mà người dùng đã đặt giá */
export function useBidderAuctions(bidder) {
  const { data, isLoading, refetch } = useReadContract({
    ...CONTRACT,
    functionName: 'getBidderAuctions',
    args: bidder ? [bidder] : undefined,
    query: { enabled: !!bidder },
  });
  return { auctionIds: data || [], isLoading, refetch };
}

/** Số tiền hoàn đang chờ rút */
export function usePendingReturn(auctionId, bidder) {
  const enabled = !!auctionId && !!bidder;
  const { data, isLoading, refetch } = useReadContract({
    ...CONTRACT,
    functionName: 'getPendingReturn',
    args: enabled ? [BigInt(auctionId), bidder] : undefined,
    query: { enabled },
  });
  return { amount: data || 0n, isLoading, refetch };
}

/** Danh sách địa chỉ trọng tài */
export function useArbitratorList() {
  const { data, isLoading } = useReadContract({
    ...CONTRACT,
    functionName: 'getArbitratorList',
  });
  return { addresses: data || [], isLoading };
}

/** Thông tin một trọng tài */
export function useArbitrator(addr) {
  const { data, isLoading } = useReadContract({
    ...CONTRACT,
    functionName: 'getArbitrator',
    args: addr ? [addr] : undefined,
    query: { enabled: !!addr },
  });
  return { arbitrator: data, isLoading };
}

/** Tranh chấp theo ID */
export function useDispute(disputeId) {
  const enabled = disputeId !== undefined && disputeId !== null;
  const { data, isLoading, refetch } = useReadContract({
    ...CONTRACT,
    functionName: 'getDispute',
    args: enabled ? [BigInt(disputeId)] : undefined,
    query: { enabled },
  });
  return { dispute: data, isLoading, refetch };
}

// ─────────────────────────────────────────────────────────────────────────────
// WRITE HOOKS (mỗi hook trả về { fn, isPending, isSuccess, error, txHash })
// ─────────────────────────────────────────────────────────────────────────────

function useContractWrite() {
  const { writeContractAsync, isPending, data: txHash, error } = useWriteContract();
  const { isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash,
    query: { enabled: !!txHash },
  });
  return { writeContractAsync, isPending, isConfirming, isSuccess, txHash, error };
}

/** Tạo phiên đấu giá mới */
export function useCreateAuction() {
  const { writeContractAsync, isPending, isConfirming, isSuccess, txHash, error } = useContractWrite();

  const createAuction = async ({
    title, description, ipfsHash = '',
    startPriceLYX, bidStepLYX,
    startTime, endTime,
    arbitrator = '0x0000000000000000000000000000000000000000',
  }) => {
    return writeContractAsync({
      ...CONTRACT,
      functionName: 'createAuction',
      args: [
        title,
        description,
        ipfsHash,
        parseEther(String(startPriceLYX)),
        parseEther(String(bidStepLYX)),
        BigInt(Math.floor(new Date(startTime).getTime() / 1000)),
        BigInt(Math.floor(new Date(endTime).getTime() / 1000)),
        arbitrator,
      ],
    });
  };

  return { createAuction, isPending, isConfirming, isSuccess, txHash, error };
}

/** Đặt giá thầu */
export function usePlaceBid() {
  const { writeContractAsync, isPending, isConfirming, isSuccess, txHash, error } = useContractWrite();

  const placeBid = async (auctionId, amountLYX) => {
    return writeContractAsync({
      ...CONTRACT,
      functionName: 'placeBid',
      args: [BigInt(auctionId)],
      value: parseEther(String(amountLYX)),
    });
  };

  return { placeBid, isPending, isConfirming, isSuccess, txHash, error };
}

/** Rút tiền hoàn khi bị outbid */
export function useWithdrawRefund() {
  const { writeContractAsync, isPending, isSuccess, txHash, error } = useContractWrite();

  const withdraw = async (auctionId) =>
    writeContractAsync({
      ...CONTRACT,
      functionName: 'withdrawRefund',
      args: [BigInt(auctionId)],
    });

  return { withdraw, isPending, isSuccess, txHash, error };
}

/** Kết thúc phiên đấu giá (sau khi hết giờ) */
export function useEndAuction() {
  const { writeContractAsync, isPending, isSuccess, txHash, error } = useContractWrite();

  const endAuction = async (auctionId) =>
    writeContractAsync({
      ...CONTRACT,
      functionName: 'endAuction',
      args: [BigInt(auctionId)],
    });

  return { endAuction, isPending, isSuccess, txHash, error };
}

/** Xác nhận nhận hàng (người mua) */
export function useConfirmReceipt() {
  const { writeContractAsync, isPending, isSuccess, txHash, error } = useContractWrite();

  const confirmReceipt = async (auctionId) =>
    writeContractAsync({
      ...CONTRACT,
      functionName: 'confirmReceipt',
      args: [BigInt(auctionId)],
    });

  return { confirmReceipt, isPending, isSuccess, txHash, error };
}

/** Mở tranh chấp */
export function useOpenDispute() {
  const { writeContractAsync, isPending, isSuccess, txHash, error } = useContractWrite();

  const openDispute = async (auctionId, reason) =>
    writeContractAsync({
      ...CONTRACT,
      functionName: 'openDispute',
      args: [BigInt(auctionId), reason],
    });

  return { openDispute, isPending, isSuccess, txHash, error };
}

/** Đăng ký làm trọng tài */
export function useRegisterArbitrator() {
  const { writeContractAsync, isPending, isSuccess, txHash, error } = useContractWrite();

  const register = async (name, feeBps, stakeLYX) =>
    writeContractAsync({
      ...CONTRACT,
      functionName: 'registerArbitrator',
      args: [name, BigInt(feeBps)],
      value: parseEther(String(stakeLYX)),
    });

  return { register, isPending, isSuccess, txHash, error };
}
