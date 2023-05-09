import { FC } from "react";
import Highlighter from "react-highlight-words";
import { CloseIconSVG } from "../../assets";

import { GeneralText, Heading6 } from "../../atoms";
import { CloseIcon, ToastDescriptionContainer, ToastImage, ToastWrapper, MultipleToast, MultipleToastWrapper } from "./styles";

interface ToastMessageProps {
  closeToast: () => void;
  img: string;
  title: string;
  description?: string;
  isMultipleMessage?: boolean;
  wordsToBold?: string[] | RegExp[];
}

export const ToastMessage: FC<ToastMessageProps> = ({
  closeToast,
  img,
  title,
  description = "",
  isMultipleMessage = false,
  wordsToBold = [],
}) => {
  return (
    <MultipleToastWrapper>
      {isMultipleMessage && <MultipleToast />}
      <ToastWrapper>
        <ToastImage src={img} alt={title} />
        <ToastDescriptionContainer>
          <Heading6>{title}</Heading6>
          <GeneralText>
            <Highlighter highlightClassName="bold" searchWords={wordsToBold} autoEscape textToHighlight={description} />
          </GeneralText>
        </ToastDescriptionContainer>
        <CloseIcon src={<CloseIconSVG />} pointer onClick={() => closeToast()} alignSelf="start" />
      </ToastWrapper>
    </MultipleToastWrapper>
  );
};
