import styled from "@emotion/styled";

interface Props {
  isVisible: boolean;
}

export const ModalContainer = styled.div<Props>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;
