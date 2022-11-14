import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const Card = styled.div`
  background-color: #031927;
  border-radius: 4px;
  padding: 12px;
`;
const H2 = styled.h2`
font-weight: 700;
font-size: 36px
  margin: 0;
  text-transform: uppercase;
`;
const H3 = styled.h3`
font-weight: 700;
font-size: 36px
  color: "#fff";
  margin: 0;
  text-transform: uppercase;
`;
const H4 = styled.h4`
font-weight: 700;
font-size: 36px
  margin: 0;
  margin-bottom: 16px;
  text-transform: uppercase;
`;
export interface ToastProps {
  result: number;
  dismiss: () => void;
}

const animation = keyframes`
    from {
        transform: translateX(100%);

    }
    to {
        transform: translateX(0);
    }
`;

const ToastCard = styled(Card)`
  position: relative;
  color: #f9f4f5;
  background: #0f8b8d;
  margin-top: 12px;
  border-radius: 12px;
  animation: ${animation} 0.5s;
  transition: transform 0.5s ease-in-out;
  display: flex;
  min-height: 100px;
`;

const LHS = styled.div`
  margin: 12px;
  min-width: 150px;
  border-right: 2px solid #0f8b8d;
`;

const RHS = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  > h2 {
    padding-right: 24px;
  }
  > button {
    all: unset;
    position: absolute;
    right: 0px;
    top: 0px;
    &:hover {
      > svg {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
        color: #0f8b8d;
      }
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  > * {
    margin-right: 12px;
  }
`;

const Toast = ({ result, dismiss }: ToastProps): JSX.Element => (
  <ToastCard>
    <LHS>
      <H4>roll</H4>
      <IconContainer>
        {/* <FaDiceD20 size={32} /> */}
        <H3>{result}</H3>
      </IconContainer>
    </LHS>
    <RHS>
      <H2>{result}</H2>
      <button onClick={dismiss} aria-label="close">
        {/* <AiOutlineCloseCircle size={28} /> */}
      </button>
    </RHS>
  </ToastCard>
);

export default Toast;
