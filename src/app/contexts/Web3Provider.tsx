import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createConfig, http, WagmiProvider } from "wagmi";
import { skaleEuropaTestnet } from "viem/chains";

// const projectId = "dd0d6065610301cf7f8d51557cbbffc3";
const queryClient = new QueryClient();

export const config = createConfig({
  chains: [skaleEuropaTestnet],
  transports: {
    [skaleEuropaTestnet.id]: http(),
  },
});

export function Web3Provider({ children }: any) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
