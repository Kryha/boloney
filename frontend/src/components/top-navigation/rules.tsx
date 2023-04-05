import { FC } from "react";

import { text } from "../../assets";
import { InfoIcon } from "../../assets/icons";
import { BULLET_POINT } from "../../constants";
import { color, fontWeights } from "../../design";
import { useStore } from "../../store";
import { BodyText, ListSection } from "../atoms";
import { LeadingZeroList } from "../leading-zero-list";
import { Dropdown } from "./dropdown";
import {
  ParagraphBulletPoint,
  ParagraphReducedMargin,
  ParagraphNoMargin,
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
  const showModal = useStore((state) => state.showModal);

  const onClick = () => {
    showModal("power-up-list-description");
  };

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
                    <BodyText key={index}>{paragraph}</BodyText>
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
                    <BodyText key={index}>{paragraph}</BodyText>
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
                    <BodyText key={index}>{paragraph}</BodyText>
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
                    <BodyText key={index}>{paragraph}</BodyText>
                  ))}
                  {/* TODO: FIX LINK */}
                  <RulesLink primaryText={text.rules.seeAvailablePowerUps} onClick={() => onClick && onClick()} />
                  <BodyText />
                </>
              }
            />
            <LeadingZeroList
              title={text.rules.actionsSecondSubtitle}
              text={
                <>
                  {text.rules.actionsSecondParagraphs.map((paragraph, index) => (
                    <BodyText key={index}>{paragraph}</BodyText>
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
                  <BodyText>{text.rules.actionsSixthParagraph}</BodyText>
                </>
              }
            />
            <LeadingZeroList
              title={text.rules.actionsFourthSubtitle}
              text={
                <>
                  {text.rules.actionsThirdParagraphs.map((paragraph, index) => (
                    <BodyText key={index}>{paragraph}</BodyText>
                  ))}
                  <ParagraphReducedMargin>{text.rules.actionsTenthParagraph}</ParagraphReducedMargin>
                  <ParagraphReducedMargin fontWeight={fontWeights.bold}>
                    {BULLET_POINT + text.rules.actionsEleventhParagraph}
                  </ParagraphReducedMargin>
                  {text.rules.actionsFirstBulletPoints.map((paragraph, index) => (
                    <ParagraphBulletPoint key={index}>{BULLET_POINT + paragraph}</ParagraphBulletPoint>
                  ))}
                  <ParagraphReducedMargin fontWeight={fontWeights.bold}>
                    {BULLET_POINT + text.rules.actionsSixteenthParagraph}
                  </ParagraphReducedMargin>
                  {text.rules.actionsSecondBulletPoints.map((paragraph, index) => (
                    <ParagraphBulletPoint key={index}>{BULLET_POINT + paragraph}</ParagraphBulletPoint>
                  ))}
                  <BodyText />
                </>
              }
            />
            <LeadingZeroList
              title={text.rules.actionsFifthSubtitle}
              text={
                <>
                  {text.rules.actionsThirdParagraphs.map((paragraph, index) => (
                    <BodyText key={index}>{paragraph}</BodyText>
                  ))}
                  <ParagraphReducedMargin fontWeight={fontWeights.bold}>{text.rules.actionsTwentyFourthParagraph}</ParagraphReducedMargin>
                  {text.rules.actionsThirdBulletPoints.map((paragraph, index) => (
                    <ParagraphBulletPoint key={index}>{BULLET_POINT + paragraph}</ParagraphBulletPoint>
                  ))}
                  <ParagraphReducedMargin fontWeight={fontWeights.bold}>
                    {BULLET_POINT + text.rules.actionsTwentyNinthParagraph}
                  </ParagraphReducedMargin>
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
                  <BodyText>{text.rules.examplesSixthParagraph}</BodyText>
                  <ParagraphNoMargin>{text.rules.examplesSeventhParagraph}</ParagraphNoMargin>
                  <ParagraphNoMargin>{text.rules.examplesEighthParagraph}</ParagraphNoMargin>
                  <BodyText>{text.rules.examplesNinthParagraph}</BodyText>
                  <ParagraphNoMargin>{text.rules.examplesTenthParagraph}</ParagraphNoMargin>
                  <ParagraphNoMargin>{text.rules.examplesEleventhParagraph}</ParagraphNoMargin>
                  <BodyText>{text.rules.examplesTwelfthParagraph}</BodyText>
                  <ParagraphNoMargin>{text.rules.examplesThirteenthParagraph}</ParagraphNoMargin>
                  <ParagraphNoMargin>{text.rules.examplesFourteenthParagraph}</ParagraphNoMargin>
                  <BodyText>{text.rules.examplesFifteenthParagraph}</BodyText>
                </>
              }
            />
            <RulesSectionTitle customcolor={color.darkGrey}>{text.rules.noteTitle}</RulesSectionTitle>
            <BodyText customcolor={color.darkGrey}>{text.rules.noteParagraph}</BodyText>
          </ListSection>
        </RulesSection>
      </RulesContainer>
    </Dropdown>
  );
};
