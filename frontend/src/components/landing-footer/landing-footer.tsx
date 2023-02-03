import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { text } from "../../assets";
import { routes } from "../../navigation";

import { PrimaryButton } from "../buttons";
import { LandingFooterWrapper } from "./styles";

export const LandingFooter: FC = () => {
  const navigate = useNavigate();
  return (
    <LandingFooterWrapper>
      <PrimaryButton primaryText={text.landing.letsRoll} onClick={() => navigate(routes.home)} />
    </LandingFooterWrapper>
  );
};
