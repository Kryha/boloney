import styled from "@emotion/styled";

import { color, fontWeight } from "../../design";

export const ToolTipContent = styled.span`
  :first-letter {
    text-transform: capitalize;
  }
  font-family: ibm-plex-mono, sans-serif;
  font-weight: ${fontWeight.light};
  font-size: clamp(0.88rem, 0.21vw + 0.75rem, 1rem);
  line-height: clamp(1.38rem, 0.21vw + 1.25rem, 1.5rem);
  letter-spacing: -0.01em;
  color: ${color.black};
`;
