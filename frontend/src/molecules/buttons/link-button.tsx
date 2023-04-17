import { FC } from "react";
import { LinkText } from "../../components";
import { FontProps, TransformText } from "../../design";
import { GeneralButtonProps } from "./secondary-button";
import { LinkContainer } from "./styles";

interface LinkProps extends GeneralButtonProps {
  customcolor?: string;
  fontWeight?: string;
  fontSize?: FontProps;
  lineHeight?: FontProps;
  font?: string;
  transformText?: TransformText;
}

export const Link: FC<LinkProps> = ({ onClick, text, customcolor, fontWeight, fontSize, lineHeight, font, transformText }) => (
  <LinkContainer onClick={() => onClick && onClick()}>
    <LinkText
      customcolor={customcolor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      lineHeight={lineHeight}
      font={font}
      transformText={transformText}
    >
      {text}
    </LinkText>
  </LinkContainer>
);
