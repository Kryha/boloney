// import Dice from "react-dice-roll";

import {
  FormContentWrapper,
  FormHeadingText,
  GeneralContentWrapper,
  GeneralText,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  HeadingContentWrapper,
  IntroText,
  Paragraph,
} from "../../components";

export const ThrowDice = () => {
  return (
    <>
      <GeneralContentWrapper>
        <Heading1>{"heading1"}</Heading1>
        <Heading2>{"heading 2"}</Heading2>
        <Heading3>{"heading 3"}</Heading3>
        <Heading4>{"heading 4"}</Heading4>
        <Heading5>{"heading 5"}</Heading5>
        <IntroText>
          {
            "intro text/Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
          }
        </IntroText>
      </GeneralContentWrapper>
      <HeadingContentWrapper>
        <Heading6>{"heading 6"}</Heading6>
        <GeneralText>
          {
            "general text/body/ Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
          }
        </GeneralText>
      </HeadingContentWrapper>
      <FormContentWrapper>
        <FormHeadingText>{"Here we have heading text"}</FormHeadingText>
        <GeneralText>
          {
            "general text/body/ Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
          }
        </GeneralText>
      </FormContentWrapper>
    </>
  );
};
