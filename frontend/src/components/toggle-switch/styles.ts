import styled from "@emotion/styled";
import { color } from "../../design";
import { FieldSet } from "../inputs/styles";

export const ToggleSwitchFieldSet = styled(FieldSet)`
  padding: revert;
  max-height: none;
`;

export const ToggleContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ToggleSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 17px;
`;

export const ToggleSwitchInput = styled.input``;

export const ToggleSwitchButton = styled.span`
  display: block;
  width: 30px;
  margin: 2px;
  background: ${color.black};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 40px;
  border-radius: 60px;
  transition: all 0.3s ease-in 0s;
`;

export const ToggleSwitchInner = styled.span`
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
  :before,
  :after {
    display: block;
    float: left;
    width: 50%;
    height: 34px;
    padding: 0;
    color: white;
    box-sizing: border-box;
  }

  :before {
    padding-left: 30px;
    background-color: ${color.black};
    content: "";
  }
`;

export const ToggleSwitchLabel = styled.label`
  display: block;
  overflow: hidden;
  cursor: pointer;
  border-radius: 20px;
  margin: -1px;
  height: 34px;
`;

export const ToggleSwitchWrapper = styled.div`
  border: 1px solid ${color.black};
  border-radius: 20px;
  position: relative;
  width: 75px;
  display: inline-block;
  vertical-align: middle;
  user-select: none;
  height: 34px;

  ${ToggleSwitchInput} {
    display: none;
  }

  :disabled {
    background-color: ${color.lightGrey};
    cursor: not-allowed;
    &:before {
      background-color: ${color.lightGrey};
      cursor: not-allowed;
    }
  }

  ${ToggleSwitchInner}:after {
    padding-right: 10px;
    background-color: ${color.lightGrey};
  }

  ${ToggleSwitchInput}:checked + ${ToggleSwitchLabel} {
    ${ToggleSwitchInner} {
      margin-left: 0;
    }
    ${ToggleSwitchButton} {
      right: 0px;
      background: ${color.lightGrey};
    }
  }
`;
