import styled from "@emotion/styled";
import { TextBoloneyLogoIcon } from "../../assets";
import { margins } from "../../design";

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: ${margins.small5};
`;

export const TextLogo = styled(TextBoloneyLogoIcon)`
  width: 90%;
  height: 100%;
  margin-left: ${margins.small5};
  margin-right: ${margins.small5};
`;
