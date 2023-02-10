import { EqualLayout, LandingComponent, LandingFooter, LeftLandingSideBar, RightLandingSideBar } from "../../components";

import { useSession, useStore } from "../../store";

export const Landing = () => {
  const session = useSession();
  const isSidebarVisible = useStore((state) => state.isSidebarVisible);

  return (
    <>
      <EqualLayout
        leftSection={<LeftLandingSideBar isSidebarVisible={isSidebarVisible} />}
        mainSection={<LandingComponent />}
        rightSection={<RightLandingSideBar isSidebarVisible={isSidebarVisible} />}
      />
      <LandingFooter session={session} />
    </>
  );
};
