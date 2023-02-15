import { FC } from "react";
import { useObserver, useViewport } from "../../hooks";
import { NeutralParagraph } from "../landing-paragraphs";
import { Image, ImageContainerBox, ImageContainerWrapper } from "./styles";

interface Props {
  image: string;
  heading: string;
  paragraph: string;
  isImageRight?: boolean;
}

export const ImageContainer: FC<Props> = ({ image, paragraph, heading, isImageRight = false }) => {
  const { ref, isVisible } = useObserver();
  const { width } = useViewport();

  return (
    <ImageContainerWrapper ref={ref} isVisible={isVisible}>
      <ImageContainerBox isImageRight={isImageRight}>
        <Image src={image} alt={heading} width={width} />
        <NeutralParagraph heading={heading} paragraph={paragraph} />
      </ImageContainerBox>
    </ImageContainerWrapper>
  );
};
