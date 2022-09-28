import { FC } from "react";

import { text } from "../../assets";
import { InfoIcon } from "../../assets/icons";
import { ColorSpan, Heading6, Paragraph } from "../atoms";
import { Dropdown } from "./dropdown";
import { RulesContainer, RulesLink, RulesSection, RulesSectionContent, RulesSectionTitle } from "./styles";
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
          <RulesSectionTitle>{text.rules.basicRuleset}</RulesSectionTitle>
          <RulesSectionContent>
            <Heading6 />
            {text.rules.basic1}
            <ColorSpan customColor="darkGrey">{text.rules.basic1Notes}</ColorSpan>
          </RulesSectionContent>
          {/* TODO: redirect somewhere or expand */}
          <RulesLink text={text.rules.seeAvailablePowerUps} />
        </RulesSection>

        {/* round */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.roundRuleset}</RulesSectionTitle>
          <RulesSectionContent>
            <Heading6 />
            {text.rules.round1}
          </RulesSectionContent>
        </RulesSection>

        {/* turn */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.turnRuleset}</RulesSectionTitle>
          <RulesSectionContent>
            <Heading6 />
            <Paragraph>{text.rules.turn1}</Paragraph>
            <Heading6 />
            <Paragraph>{text.rules.turn2}</Paragraph>
            <Heading6 />
            <Paragraph>{text.rules.turn3}</Paragraph>
          </RulesSectionContent>
        </RulesSection>
      </RulesContainer>
    </Dropdown>
  );
};
