import { FC } from "react";
import { FluidImage } from "../../atoms";
import { images } from "../../design";
import { MatchImageWrapper } from "./styles";

interface Props {
  image: string;
  alt: string;
}

/**
 *
 * This is the match image component, its is used within a match to display an image, i.e call boloney winner.
 * @param {string} image - This is the image file
 * @param {string} alt - Provides alternative information for an image if a user for some reason cannot view it
 */

export const MatchImage: FC<Props> = ({ image, alt }) => {
  return (
    <MatchImageWrapper alignItems="center" justifyContent="center">
      <FluidImage alt={alt} src={image} height={images.fluid} width={images.auto} />
    </MatchImageWrapper>
  );
};
