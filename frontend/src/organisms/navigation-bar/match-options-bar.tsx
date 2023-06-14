import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { MatchMenu, ActiveDropdown, MatchStats } from "../../molecules";
import { routes } from "../../navigation";
import { useMatch } from "../../service";
import { useStore } from "../../store";
import { isNkError } from "../../types";
import { NavigationWrapper } from "./styles";

interface Props {
  totalDice?: number;
  stageNumber?: number;
  drawNumber?: number;
}

/**
 * This is the Match options bar, its is a part of the match navigation bar and contains the match stats.
 * @param {number} totalDice - The total amount of dice in the match.
 * @param {number} stageNumber - Divides the current number of dice in play
 * @param {number} drawNumber -  Rounds until the next power-up draw
 */

export const MatchOptionsBar: FC<Props> = ({ totalDice, stageNumber, drawNumber }) => {
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);

  const navigate = useNavigate();

  const setModalWithContainer = useStore((state) => state.setModalWithContainer);
  const setModalComponentChildren = useStore((state) => state.setModalComponentChildren);
  const { broadcastPlayerLeft } = useMatch();

  const useOnClickOutsideDropdown = (ref: React.RefObject<HTMLElement>, isOpen: boolean) => {
    useOnClickOutside(ref, () => isOpen && setActiveDropdown(undefined));
  };

  const handleDropdownClick = (dropdown: ActiveDropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(undefined);
    } else {
      setActiveDropdown(dropdown);
      setIsComponentVisible(true);
    }
  };

  const handleSettings = () => {
    setModalWithContainer(true);
    setModalComponentChildren("match-settings-overview");
  };

  const onLeaveMatchClick = async () => {
    const res = await broadcastPlayerLeft();
    if (isNkError(res)) {
      // TODO: show error to user
      console.warn(res);
    } else {
      navigate(routes.home);
    }
  };

  return (
    <NavigationWrapper isMatchOptions>
      <MatchStats totalDice={totalDice} stageNumber={stageNumber} drawNumber={drawNumber} />
      <MatchMenu
        onClickOutsideDropdown={useOnClickOutsideDropdown}
        onLeaveMatchClick={onLeaveMatchClick}
        onSettingsClick={handleSettings}
        isOpen={activeDropdown === "options" && isComponentVisible}
        expand={() => handleDropdownClick("options")}
      />
    </NavigationWrapper>
  );
};
