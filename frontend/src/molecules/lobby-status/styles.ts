import styled from "@emotion/styled";
import { BaseColumn, Heading4 } from "../../atoms";
import { lobbySizes, spacing } from "../../design";

export const LobbyStatusWrapper = styled(BaseColumn)`
  padding: ${spacing.xs} ${spacing.xs} ${spacing.xs} ${spacing.s};
  ${Heading4} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: ${lobbySizes.xs};
    :first-letter {
      text-transform: lowercase;
    }
  }
`;
