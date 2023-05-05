import styled from "@emotion/styled";
import { Heading2 } from "../../atoms";

export const MdWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  margin-left: auto;
  gap: 20px;
  margin-right: auto;
  ${Heading2} {
    margin-bottom: 3rem;
    margin-top: 3rem;
  }
  ul {
    margin-left: 0px;
    align-items: none;
  }
`;
