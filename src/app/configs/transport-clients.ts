import { createWalletClient, custom, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum!),
});

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
