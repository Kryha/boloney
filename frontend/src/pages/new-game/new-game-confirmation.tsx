import { FC } from "react";
import { text } from "../../assets";

import { Heading1 } from "../../components";

interface Props {
  url: string;
}

export const NewGameConfirmation: FC<Props> = ({ url }) => {
  return (
    <>
      <Heading1>{text.general.gameCreated}</Heading1>
    </>
  );
};
