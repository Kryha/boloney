import { FC } from "react";
import Highlighter from "react-highlight-words";

import { GeneralText, Heading6 } from "../atoms";
import { CloseButton, ToastDescriptionContainer, ToastImage, ToastWrapper, MultipleToast, MultipleToastWrapper } from "./styles";

interface ToastMessageProps {
  closeToast: () => void;
  img: string;
  title: string;
  description?: string;
  isMultipleMessage?: boolean;
  wordsToBold?: string[] | RegExp[];
  isButtonVisible?: boolean;
}

export const ToastMessage: FC<ToastMessageProps> = ({
  closeToast,
  img,
  title,
  description = "",
  isMultipleMessage = false,
  wordsToBold = [],
  isButtonVisible,
}) => {
  return (
    <MultipleToastWrapper isButtonVisible={isButtonVisible}>
      {isMultipleMessage && <MultipleToast />}
      <ToastWrapper>
        <ToastImage src={img} alt={title} />
        <ToastDescriptionContainer>
          <Heading6>{title}</Heading6>
          <GeneralText>
            <Highlighter highlightClassName="bold" searchWords={wordsToBold} autoEscape textToHighlight={description} />
          </GeneralText>
        </ToastDescriptionContainer>
        <CloseButton onClick={() => closeToast()} />
      </ToastWrapper>
    </MultipleToastWrapper>
  );
};
