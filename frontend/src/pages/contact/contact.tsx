import { FC } from "react";
import { ContactComponent, EqualLayout, Logo } from "../../components";
import { useIsMobile } from "../../hooks";

export const ContactPage: FC = () => {
  const isMobile = useIsMobile();
  const leftSection = isMobile || <Logo />;

  return <EqualLayout leftSection={leftSection} mainSection={<ContactComponent isMobile={isMobile} />} />;
};
