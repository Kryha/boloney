import { FC } from "react";

import { text } from "../../assets";
import { InfoIcon } from "../../assets/icons";
import { ColorSpan } from "../atoms";
import { Dropdown } from "./dropdown";
import { RulesContainer, RulesSection, RulesSectionContent, RulesSectionTitle } from "./styles";
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
        <RulesSectionTitle>{text.rules.basicRuleset}</RulesSectionTitle>
        <RulesSection>
          <RulesSectionContent>
            {text.rules.basic1}
            <ColorSpan customColor="darkGrey">{text.rules.basic1Notes}</ColorSpan>
          </RulesSectionContent>
        </RulesSection>

        {/* round */}
        <RulesSectionTitle>{text.rules.roundRuleset}</RulesSectionTitle>
        <RulesSection>
          <RulesSectionContent>{text.rules.round1}</RulesSectionContent>
        </RulesSection>

        {/* turn */}
        <RulesSectionTitle>{text.rules.turnRuleset}</RulesSectionTitle>
        <RulesSection>
          <RulesSectionContent>{text.rules.turn1}</RulesSectionContent>
          <RulesSectionContent>{text.rules.turn2}</RulesSectionContent>
          <RulesSectionContent>{text.rules.turn3}</RulesSectionContent>
        </RulesSection>
      </RulesContainer>
    </Dropdown>
  );
};
