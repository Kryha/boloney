import styled from "@emotion/styled";
import { NumberListItem, OrderedNumberList } from "../../atoms";

export const UnorderedOrderedList = styled.div`
  ${NumberListItem} {
    list-style-position: inside;
  }
  ${OrderedNumberList} {
    list-style-position: inside;
    padding-left: 0px;
  }
`;
