import { Session } from "@heroiclabs/nakama-js";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../../assets";
import { PrimaryButtonWrapper } from "../../molecules";
import { routes } from "../../navigation";
import { PrimaryButtonBase } from "../atoms";
import { LandingFooterWrapper } from "./styles";

interface Props {
  session?: Session;
}

export const LandingFooter: FC<Props> = ({ session }) => {
  const navigate = useNavigate();
  const route = session ? routes.home : routes.login;

  return (
    <LandingFooterWrapper>
      <PrimaryButtonWrapper onClick={() => navigate(route)}>
        <PrimaryButtonBase type="button">{text.landing.letsRoll}</PrimaryButtonBase>
      </PrimaryButtonWrapper>
    </LandingFooterWrapper>
  );
};
