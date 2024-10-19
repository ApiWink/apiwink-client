import { createWalletClient, createPublicClient, http } from "viem";
import { skaleEuropaTestnet } from "viem/chains";

export const walletClient = createWalletClient({
  chain: skaleEuropaTestnet,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: skaleEuropaTestnet,
  transport: http(),
});
