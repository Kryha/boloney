import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { float, PlayerBox } from "../../atoms";
import { FLOATING_ANIMATION_SPEED } from "../../constants";
import { color, MATCH_WINNER_IMAGE_WIDTH, spacing } from "../../design";

export const MatchWinnerWrapper = styled(PlayerBox)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  border-right: 1px solid ${color.mediumGrey};
`;

interface Props {
  speed?: number;
}

export const DiceCrownImg = styled.img<Props>`
  width: ${MATCH_WINNER_IMAGE_WIDTH};
  height: auto;
  object-fit: cover;
  flex-shrink: 0;
  position: relative;
  top: 0px;

  animation: ${({ speed }) => {
    return css`
      ${float} ease ${speed || FLOATING_ANIMATION_SPEED}s infinite;
    `;
  }};
`;
