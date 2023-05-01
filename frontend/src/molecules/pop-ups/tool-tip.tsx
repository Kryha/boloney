import { FC } from "react";
import { TooltipBlock } from "../../atoms";
import { spacing } from "../../design";
import { TooltipContent } from "../text";

interface Props {
  description?: string;
  heading?: string;
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} description - description / general text
 * @param {string} heading - The main heading
 */

export const TooltipFrame: FC<Props> = ({ description, heading }) => {
  return (
    <TooltipBlock padding={spacing.s}>
      <TooltipContent heading={heading} description={description} />
    </TooltipBlock>
  );
};
