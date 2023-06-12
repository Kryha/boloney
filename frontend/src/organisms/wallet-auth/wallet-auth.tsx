import { useState } from "react";

import { WalletLogin } from "./wallet-login";
import { WalletRegistration } from "./wallet-registration";

export const WalletAuth = () => {
  const [signature, setSignature] = useState("");

  return <>{signature ? <WalletRegistration signature={signature} /> : <WalletLogin setSignature={setSignature} />}</>;
};
