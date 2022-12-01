import { useStore } from "../../store";
import { PlaceBid } from "../place-bid";
import { CallBoloney } from "../call-boloney";
import { CallExact } from "../call-exact";
import { ProceedWithActionWrapper } from "./styles";

export const ProceedWithAction = () => {
  const action = useStore((state) => state.action);

  const proceedActionView = () => {
    switch (action) {
      case "bid":
        return <PlaceBid />;
      case "boloney":
        return <CallBoloney />;
      case "exact":
        return <CallExact />;
      case "healDice":
        return <></>;
      case "powerUp":
        return <></>;
    }
  };

  return <ProceedWithActionWrapper>{proceedActionView()}</ProceedWithActionWrapper>;
};
