import styled from "@emotion/styled";
import { BaseColumn, CenteredImage } from "../../atoms";
import { images } from "../../design";

interface Props {
  height?: string;
}

export const AvatarWrapper = styled(BaseColumn)<Props>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height ?? images.auto};
  ${CenteredImage} {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }
`;
