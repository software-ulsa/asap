import { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";

import { styled } from "@mui/system";

import { VerticalComponent } from "../components";

import useSettings from "../hooks/useSettings";
import { useSelector } from "react-redux";
import { navigations } from "../routes/navigations";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100vw",
  zIndex: -1,
  [theme.breakpoints.up("lg")]: { display: "none" },
}));

const MainSidebar = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const { currentUser } = useSelector((state) => state.auth);

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = "layoutSettings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <VerticalComponent items={navigations(currentUser.rol.permisos)} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
};

export default MainSidebar;
