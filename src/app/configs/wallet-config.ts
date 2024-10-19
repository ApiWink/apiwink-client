import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet],
  connectors: [injected(), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
  },
});
