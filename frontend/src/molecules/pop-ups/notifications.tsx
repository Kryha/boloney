import { FC } from "react";
import { CloseIconSVG } from "../../assets";
import { BaseIcon, BaseRow, FluidImage, PopUp, PopUpBlock } from "../../atoms";
import { containerHeight, images, spacing } from "../../design";
import { NotificationHeading } from "../text";
import { ToastContentWrapper, ToastWrapper } from "./styles";

interface Props {
  subheading?: string;
  heading?: string;
  subheadingColor?: string;
  headingColor?: string;
  img?: string;
  isMultipleNotifications?: boolean;
  closeToast: () => void;
  wordsToBold?: string[] | RegExp[];
}

/**
 * N.B You can give this component the different fontsizes and lineheights for the different texts. These must be uniform!
 * @param {string} subheading - subheading / general text
 * @param {string} heading - The main heading
 * @param {string} subheadingColor - color for the subheading / general text
 * @param {string} headingColor - color for the heading text
 * @param {string} img - the image for the toast notification
 * @param {boolean} isMultipleNotifications -  whether there are multiple notifications or not
 */

export const ToastNotifications: FC<Props> = ({
  subheading,
  heading,
  subheadingColor,
  headingColor,
  img,
  isMultipleNotifications,
  closeToast,
  wordsToBold,
}) => {
  return (
    <ToastWrapper alignItems="center">
      {isMultipleNotifications && <PopUpBlock />}
      <PopUp height="fit-content">
        <BaseRow>
          <FluidImage src={img} height={images.fluid} width={images.auto} maxHeight={containerHeight.xl} />
          <ToastContentWrapper justifyContent="space-between" gap={spacing.ms}>
            <NotificationHeading
              heading={heading}
              headingColor={headingColor}
              subheading={subheading}
              subheadingColor={subheadingColor}
              wordsToBold={wordsToBold}
            />
            <BaseIcon src={<CloseIconSVG />} alignSelf="flex-start" pointer onClick={closeToast} />
          </ToastContentWrapper>
        </BaseRow>
      </PopUp>
    </ToastWrapper>
  );
};
