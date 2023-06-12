import { BaseLayout, Logo } from "../../components";
import { WalletAuth } from "../../organisms";

export const WalletAuthPage = () => {
  return <BaseLayout leftSection={<Logo />} mainSection={<WalletAuth />} />;
};
