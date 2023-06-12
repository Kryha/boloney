import { FC, ReactNode } from "react";
import { DecryptPermission, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";

import { WALLET_APP_NAME } from "../../constants";

interface LeoWalletProviderProps {
  children: ReactNode;
}

const walletAdapter = new LeoWalletAdapter({
  appName: WALLET_APP_NAME,
});

export const LeoWalletProvider: FC<LeoWalletProviderProps> = ({ children }) => {
  return (
    <WalletProvider wallets={[walletAdapter]} decryptPermission={DecryptPermission.UponRequest} network={WalletAdapterNetwork.Testnet}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
};
