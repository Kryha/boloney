import styled from "@emotion/styled";
import { margins } from "../../design";
import { BaseIcon } from "../../atoms";

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${margins.small5} ${margins.small2};
  cursor: pointer;
`;

export const TextLogoIcon = styled(BaseIcon)`
  margin-left: ${margins.small5};
  margin-right: ${margins.small5};
`;
