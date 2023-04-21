import { EqualLayout, Landing, LandingFooter, LeftLandingSideBar, RightLandingSideBar } from "../../components";
import { useIsMobile, useViewport } from "../../hooks";

import { useSession, useStore } from "../../store";

export const LandingPage = () => {
  const session = useSession();
  const isSidebarVisible = useStore((state) => state.isSidebarVisible);
  const isMobile = useIsMobile();
  const { width, height } = useViewport();

  const leftSection = isMobile ? <></> : <LeftLandingSideBar isSidebarVisible={isSidebarVisible} />;
  const rightSection = isMobile ? <> </> : <RightLandingSideBar isSidebarVisible={isSidebarVisible} />;

  return (
    <>
      <EqualLayout
        leftSection={leftSection}
        mainSection={<Landing isMobile={isMobile} isSidebarVisible={isSidebarVisible} width={width} height={height} />}
        rightSection={rightSection}
        isLanding
      />
      <LandingFooter session={session} />
    </>
  );
};
