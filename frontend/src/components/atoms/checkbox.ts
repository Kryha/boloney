import styled from "@emotion/styled";
import { color } from "../../design";

export const RadioCheckbox = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: clamp(20px, 2.08vw + 0px, 40px);
  height: clamp(20px, 2.08vw + 0px, 40px);
  border: 1px solid ${color.mediumGrey};
  border-radius: 50%;
  ::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: clamp(10px, 1.04vw + 0px, 20px);
    height: clamp(10px, 1.04vw + 0px, 20px);
    margin: clamp(3px, 0.52vw + -2px, 8px);
  }
  :hover {
    background: ${color.white};
    ::after {
      background-color: ${color.black};
      border: 1px solid ${color.black};
    }
  }
  :focus {
    border: 1px solid ${color.black};
  }
  :checked {
    background: ${color.white};
    ::after {
      background-color: ${color.black};
      border: 1px solid ${color.black};
      ::after {
        width: clamp(10px, 1.04vw + 0px, 20px);
        height: clamp(10px, 1.04vw + 0px, 20px);
      }
    }
    :hover {
      background-color: ${color.white};
      border: 1px solid ${color.mediumGrey};
      ::after {
        background-color: ${color.black};
      }
    }
  }
  :disabled {
    cursor: not-allowed;
    border: 1px solid ${color.black};
    background-color: ${color.grey};
    :hover {
      ::after {
        background-color: ${color.black};
      }
    }
    :checked {
      ::after {
        background-color: ${color.black};
      }
      :hover {
        background-color: ${color.white};
        ::after {
          background-color: ${color.grey};
        }
      }
    }
  }
`;
