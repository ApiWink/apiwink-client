import { createPublicClient, http, webSocket } from "viem";
import { skaleEuropaTestnet } from "viem/chains";

export function createClient() {
  const client = createPublicClient({
    chain: skaleEuropaTestnet,
    transport: http("https://juicy-low-small-testnet-indexer.skalenodes.com"),
  });

  return client;
}
