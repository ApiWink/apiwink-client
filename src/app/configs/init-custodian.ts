import { WSS_URL } from "./config";
import { createWalletClient, webSocket, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { skaleEuropaTestnet } from "viem/chains";

export function initializeCustodian(privateKey: `0x${string}`) {
  return createWalletClient({
    account: privateKeyToAccount(privateKey),
    chain: skaleEuropaTestnet,
    transport: http(),
  });
}
