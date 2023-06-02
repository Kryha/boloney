import { FC } from "react";
import { text } from "../../assets";
import { color, fontSizes, fontWeights, lineHeights, spacing } from "../../design";
import { ParagraphList, UnorderedList } from "../lists";
import { BaseColumn, BodyText, LinkText, PopUpFooter } from "../../atoms";
import { RulesHeading, RulesNumberedParagraph, RulesParagraph } from "../text";
import { RulesTitle, RulesWrapper } from "./styles";

interface Props {
  onClick?: () => void;
}

/**
 * @param {Function} onClick - A function whose use is to open up the power-up modal.
 */

export const RulesInformation: FC<Props> = ({ onClick }) => {
  return (
    <RulesWrapper padding={spacing.sm}>
      <RulesTitle>{text.rules.basicRules}</RulesTitle>
      <BaseColumn gap={spacing.md}>
        <RulesHeading
          heading={text.rules.basicLeadingTitle}
          paragraph={<RulesParagraph paragraph={text.rules.basicRulesParagraphs} gap={spacing.sm} />}
        />
        <RulesHeading
          heading={text.rules.settingsTitle}
          paragraph={
            <ParagraphList
              gap={spacing.xs}
              paragraphs={text.rules.settingsParagraph}
              paragraphGap={spacing.xs}
              listItems={text.rules.settingsList}
            />
          }
        />
        <RulesHeading
          heading={text.rules.roundRulesTitle}
          paragraph={<RulesParagraph paragraph={text.rules.roundRulesParagraphs} gap={spacing.sm} />}
        />
        <RulesHeading
          heading={text.rules.actionsTitle}
          paragraph={
            <RulesNumberedParagraph
              heading={text.rules.actionsFirstSubtitle}
              paragraph={
                <BaseColumn gap={spacing.sm}>
                  <RulesParagraph paragraph={text.rules.actionsFirstParagraphs} gap={spacing.sm} />
                  <LinkText fontSize={fontSizes.body} lineHeight={lineHeights.body} onClick={onClick}>
                    {text.rules.seeAvailablePowerUps}
                  </LinkText>
                </BaseColumn>
              }
            />
          }
        />
        <RulesNumberedParagraph
          heading={text.rules.actionsSecondSubtitle}
          paragraph={<RulesParagraph paragraph={text.rules.actionsSecondParagraphs} gap={spacing.sm} />}
        />
        <RulesNumberedParagraph
          heading={text.rules.actionsThirdSubtitle}
          paragraph={
            <BaseColumn gap={spacing.sm}>
              <ParagraphList
                gap={spacing.xs}
                paragraphs={[text.rules.actionsFifthParagraphHeading]}
                paragraphGap={spacing.sm}
                listItems={text.rules.actionsFifthParagraphs}
                listStyle="disc"
              />
              <BodyText>{text.rules.actionsSixthParagraph}</BodyText>
            </BaseColumn>
          }
        />
        <RulesNumberedParagraph
          heading={text.rules.actionsFourthSubtitle}
          paragraph={
            <BaseColumn gap={spacing.sm}>
              <RulesParagraph gap={spacing.sm} paragraph={text.rules.actionsThirdParagraph} />
              <UnorderedList
                listHeadingFontWeight={fontWeights.bolder}
                listHeading={[text.rules.actionsEleventhParagraph]}
                listStyle="disc"
                listItems={text.rules.actionsFirstBulletPoints}
              />
              <UnorderedList
                listHeadingFontWeight={fontWeights.bolder}
                listHeading={[text.rules.actionsSixteenthParagraph]}
                listStyle="disc"
                listItems={text.rules.actionsSecondBulletPoints}
              />
            </BaseColumn>
          }
        />
        <RulesNumberedParagraph
          heading={text.rules.actionsFifthSubtitle}
          paragraph={
            <BaseColumn gap={spacing.sm}>
              <RulesParagraph gap={spacing.sm} paragraph={text.rules.actionsFourthParagraphs} />
              <UnorderedList
                listHeadingFontWeight={fontWeights.bolder}
                listHeading={[text.rules.actionsTwentyFourthParagraph]}
                listStyle="disc"
                listItems={text.rules.actionsThirdBulletPoints}
              />
              <UnorderedList
                listHeadingFontWeight={fontWeights.bolder}
                listHeading={[text.rules.actionsTwentyNinthParagraph]}
                listStyle="disc"
                listItems={text.rules.actionsFourthBulletPoints}
              />
            </BaseColumn>
          }
        />
        <BaseColumn gap={spacing.sm}>
          <RulesNumberedParagraph
            heading={text.rules.examplesTitle}
            paragraph={<RulesParagraph paragraph={text.rules.exampleFirstParagraphs} />}
          />
          <RulesParagraph paragraph={text.rules.exampleSecondParagraphs} />
          <RulesParagraph paragraph={text.rules.exampleThirdParagraphs} />
          <RulesParagraph paragraph={text.rules.exampleFourthParagraphs} />
          <RulesNumberedParagraph
            heading={text.rules.noteTitle}
            headingColor={color.darkGrey}
            paragraph={<BodyText customcolor={color.darkGrey}>{text.rules.noteParagraph}</BodyText>}
          />
        </BaseColumn>
      </BaseColumn>
      <PopUpFooter position="sticky" />
    </RulesWrapper>
  );
};
