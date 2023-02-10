import { Session } from "@heroiclabs/nakama-js";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../../assets";
import { routes } from "../../navigation";

import { PrimaryButton } from "../buttons";
import { LandingFooterWrapper } from "./styles";

interface Props {
  session?: Session;
}

export const LandingFooter: FC<Props> = ({ session }) => {
  const navigate = useNavigate();
  const route = session ? routes.home : routes.login;

  return (
    <LandingFooterWrapper>
      <PrimaryButton primaryText={text.landing.letsRoll} onClick={() => navigate(route)} />
    </LandingFooterWrapper>
  );
};
