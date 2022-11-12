import React from "react";

import { Box, styled, useTheme } from "@mui/system";
import { IconButton, ButtonBase } from "@mui/material";
import { JoinLeftRounded, Menu } from "@mui/icons-material";

import Brand from "../../Brand";
import Sidenav from "../../MainSidebar";

import { Span } from "../../../components/Typography";
import { themeShadows } from "../../../components/Theme/themeColors";

import { convertHexToRGB } from "../../../utils/utils";

import useSettings from "../../../hooks/useSettings";
import { sidenavCompactWidth, sideNavWidth } from "../../../utils/constant";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 0,
  padding: 0,
  height: 64,
  justifyContent: "center",
  color: theme.palette.text.primary,
}));

const SidebarNavRoot = styled(Box)(({ theme, width }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: width,
  boxShadow: themeShadows[8],
  zIndex: 111,
  overflow: "hidden",
  color: theme.palette.text.primary,
  transition: "all 250ms ease-in-out",
  backgroundColor: "white",
}));

const NavListBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledText = styled(Span)(({ mode }) => ({
  fontSize: "0.875rem",
  paddingLeft: "0.8rem",
  display: mode === "compact" && "none",
}));

const LayoutSidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const primaryRGB = convertHexToRGB(theme.palette.primary.main);
  const leftSidebar = settings.layoutSettings.leftSidebar;
  const { mode } = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case "compact":
        return sidenavCompactWidth;
      default:
        return sideNavWidth;
    }
  };

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layoutSettings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === "compact" ? "full" : "compact" });
  };

  return (
    <SidebarNavRoot width={getSidenavWidth()}>
      <NavListBox>
        <Brand />
        <Sidenav />
        <StyledIconButton onClick={handleSidenavToggle}>
          {mode === "compact" ? (
            <Menu />
          ) : (
            <>
              <ButtonBase name="child" sx={{ width: "100%" }}>
                <JoinLeftRounded
                  sx={{ width: 24, height: "auto", fontSize: 15 }}
                />

                <StyledText mode={mode} className="sidenavHoverShow">
                  Contraer
                </StyledText>
              </ButtonBase>
            </>
          )}
        </StyledIconButton>
      </NavListBox>
    </SidebarNavRoot>
  );
};

export default React.memo(LayoutSidenav);
