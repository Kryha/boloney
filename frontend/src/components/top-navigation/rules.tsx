import { FC } from "react";

import { text } from "../../assets";
import { InfoIcon } from "../../assets/icons";
import { ColorSpan, ListSection, Paragraph } from "../atoms";
import { LeadingZeroList } from "../leading-zero-list";
import { Dropdown } from "./dropdown";
import { RulesContainer, RulesLink, RulesSection, RulesSectionTitle } from "./styles";
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
          <ListSection>
            <LeadingZeroList text={<Paragraph>{text.rules.basic1}</Paragraph>} />
            <ColorSpan customColor="darkGrey">{text.rules.basic1Notes}</ColorSpan>
          </ListSection>
          {/* TODO: redirect somewhere or expand */}
          <RulesLink text={text.rules.seeAvailablePowerUps} />
        </RulesSection>

        {/* round */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.roundRuleset}</RulesSectionTitle>
          <ListSection>
            <LeadingZeroList text={<Paragraph>{text.rules.round1}</Paragraph>} />
          </ListSection>
        </RulesSection>

        {/* turn */}
        <RulesSection>
          <RulesSectionTitle>{text.rules.turnRuleset}</RulesSectionTitle>
          <ListSection>
            <LeadingZeroList text={<Paragraph>{text.rules.turn1}</Paragraph>} />
            <LeadingZeroList text={<Paragraph>{text.rules.turn2}</Paragraph>} />
            <LeadingZeroList text={<Paragraph>{text.rules.turn3}</Paragraph>} />
          </ListSection>
        </RulesSection>
      </RulesContainer>
    </Dropdown>
  );
};
