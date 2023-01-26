import { FC } from "react";

import { text } from "../../assets";
import { InfoIcon } from "../../assets/icons";
import { BULLET_POINT } from "../../constants";
import { ColorSpan, ListSection, Paragraph } from "../atoms";
import { LeadingZeroList } from "../leading-zero-list";
import { Dropdown } from "./dropdown";
import {
  ParagraphBulletPoint,
  ParagraphBulletPointBold,
  ParagraphNoMargin,
  ParagraphReducedMargin,
  RulesContainer,
  RulesLink,
  RulesSection,
  RulesSectionTitle,
} from "./styles";
import { ActiveDropdown } from "./top-navigation";

interface Props {
  setHover?: (hover: boolean) => void;
  isActive: boolean;
  setActiveDropdown: (dropdown: ActiveDropdown) => void;
}

export const RulesDropdown: FC<Props> = ({ setHover, isActive, setActiveDropdown }) => {
  return (
    <Dropdown
      setHover={setHover}
      isActive={isActive}
      expand={() => setActiveDropdown("rules")}
      buttonText={text.general.rules}
      buttonIcon={<InfoIcon />}
    >
      <RulesContainer>
        {/* basic */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.basicRules}</RulesSectionTitle>
          <ListSection>
            <LeadingZeroList
              title={text.rules.basicLeadingTitle}
              text={
                <>
                  {text.rules.basicRulesParagraphs.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                  ))}
                </>
              }
            />
          </ListSection>
        </RulesSection>

        {/* settings */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.settingsTitle}</RulesSectionTitle>
          <ListSection>
            <LeadingZeroList
              text={
                <>
                  {text.rules.settingsParagraphs.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                  ))}
                </>
              }
            />
          </ListSection>
        </RulesSection>

        {/* round */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.roundRulesTitle}</RulesSectionTitle>
          <ListSection>
            <LeadingZeroList
              text={
                <>
                  {text.rules.roundRulesParagraphs.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                  ))}
                </>
              }
            />
          </ListSection>
        </RulesSection>

        {/* actions */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.actionsTitle}</RulesSectionTitle>
          <ListSection>
            <LeadingZeroList
              title={text.rules.actionsFirstSubtitle}
              text={
                <>
                  {text.rules.actionsFirstParagraphs.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                  ))}
                  {/* TODO: FIX LINK */}
                  <RulesLink primaryText={text.rules.seeAvailablePowerUps} />
                  <Paragraph />
                </>
              }
            />
            <LeadingZeroList
              title={text.rules.actionsSecondSubtitle}
              text={
                <>
                  {text.rules.actionsSecondParagraphs.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                  ))}
                </>
              }
            />
            <LeadingZeroList
              title={text.rules.actionsThirdSubtitle}
              text={
                <>
                  <ParagraphReducedMargin>{text.rules.actionsFifthParagraph}</ParagraphReducedMargin>
                  <ParagraphBulletPoint>{BULLET_POINT + text.rules.actionsBulletPoint1}</ParagraphBulletPoint>
                  <ParagraphBulletPoint> {BULLET_POINT + text.rules.actionsBulletPoint2}</ParagraphBulletPoint>
                  <Paragraph>{text.rules.actionsSixthParagraph}</Paragraph>
                </>
              }
            />
            <LeadingZeroList
              title={text.rules.actionsFourthSubtitle}
              text={
                <>
                  {text.rules.actionsThirdParagraphs.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                  ))}
                  <ParagraphReducedMargin>{text.rules.actionsTenthParagraph}</ParagraphReducedMargin>
                  <ParagraphBulletPointBold>{BULLET_POINT + text.rules.actionsEleventhParagraph}</ParagraphBulletPointBold>
                  {text.rules.actionsFirstBulletPoints.map((paragraph, index) => (
                    <ParagraphBulletPoint key={index}>{BULLET_POINT + paragraph}</ParagraphBulletPoint>
                  ))}
                  <ParagraphBulletPointBold>{BULLET_POINT + text.rules.actionsSixteenthParagraph}</ParagraphBulletPointBold>
                  {text.rules.actionsSecondBulletPoints.map((paragraph, index) => (
                    <ParagraphBulletPoint key={index}>{BULLET_POINT + paragraph}</ParagraphBulletPoint>
                  ))}
                  <Paragraph />
                </>
              }
            />
            <LeadingZeroList
              title={text.rules.actionsFifthSubtitle}
              text={
                <>
                  {text.rules.actionsThirdParagraphs.map((paragraph, index) => (
                    <Paragraph key={index}>{paragraph}</Paragraph>
                  ))}
                  <ParagraphBulletPointBold>{text.rules.actionsTwentyFourthParagraph}</ParagraphBulletPointBold>
                  {text.rules.actionsThirdBulletPoints.map((paragraph, index) => (
                    <ParagraphBulletPoint key={index}>{BULLET_POINT + paragraph}</ParagraphBulletPoint>
                  ))}
                  <ParagraphBulletPointBold>{BULLET_POINT + text.rules.actionsTwentyNinthParagraph}</ParagraphBulletPointBold>
                  {text.rules.actionsFourthBulletPoints.map((paragraph, index) => (
                    <ParagraphBulletPoint key={index}>{BULLET_POINT + paragraph}</ParagraphBulletPoint>
                  ))}
                </>
              }
            />
          </ListSection>
        </RulesSection>

        {/* examples */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.examplesTitle}</RulesSectionTitle>
          <ListSection>
            <LeadingZeroList
              text={
                <>
                  {text.rules.examplesParagraphs.map((paragraph, index) => (
                    <ParagraphNoMargin key={index}>{paragraph}</ParagraphNoMargin>
                  ))}
                  <Paragraph>{text.rules.examplesSixthParagraph}</Paragraph>
                  <ParagraphNoMargin>{text.rules.examplesSeventhParagraph}</ParagraphNoMargin>
                  <ParagraphNoMargin>{text.rules.examplesEighthParagraph}</ParagraphNoMargin>
                  <Paragraph>{text.rules.examplesNinthParagraph}</Paragraph>
                  <ParagraphNoMargin>{text.rules.examplesTenthParagraph}</ParagraphNoMargin>
                  <ParagraphNoMargin>{text.rules.examplesEleventhParagraph}</ParagraphNoMargin>
                  <Paragraph>{text.rules.examplesTwelfthParagraph}</Paragraph>
                  <ParagraphNoMargin>{text.rules.examplesThirteenthParagraph}</ParagraphNoMargin>
                  <ParagraphNoMargin>{text.rules.examplesFourteenthParagraph}</ParagraphNoMargin>
                  <Paragraph>{text.rules.examplesFifteenthParagraph}</Paragraph>
                </>
              }
            />
            <RulesSectionTitle customColor="darkGrey">{text.rules.noteTitle}</RulesSectionTitle>
            <ColorSpan customColor="darkGrey">{text.rules.noteParagraph}</ColorSpan>
          </ListSection>
        </RulesSection>
      </RulesContainer>
    </Dropdown>
  );
};
