import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Logout,
  Person,
} from "@mui/icons-material";
import {
  Avatar,
  Hidden,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";

import { Span } from "../../Typography";
import useSettings from "../../../hooks/useSettings";
import { topBarHeight } from "../../../utils/constant";

import { Menu } from "../../../components";
import { themeShadows } from "../../../components/Theme/themeColors";

import ImagenesService from "../../../services/ImagesService";
import { logout } from "../../../reducers/AuthReducer";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: 0,
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const LayoutTopbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { settings, updateSettings } = useSettings();
  const { mode } = settings.layoutSettings.leftSidebar;
  const { currentUser } = useSelector((state) => state.auth);

  const [image, setImage] = useState();

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layoutSettings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layoutSettings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layoutSettings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layoutSettings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  useEffect(() => {
    if (currentUser.imagen) {
      ImagenesService.get(currentUser.imagen)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => console.log(error));
    }
  }, [currentUser]);

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            {mode === "compact" ? (
              <Hidden />
            ) : mode === "full" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <Menu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Vienvenido,
                    <strong>{` ${currentUser.persona.nombre}`}</strong>
                  </Span>
                </Hidden>
                <Avatar src={image} sx={{ cursor: "pointer" }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/perfil">
                <Person style={{ marginRight: 10 }} color="primary" />
                <Span> Perfil </Span>
              </Link>
            </StyledItem>

            <StyledItem
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              <Logout style={{ marginRight: 10 }} color="primary" />
              <Span> Cerrar sesi&oacute;n </Span>
            </StyledItem>
          </Menu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(LayoutTopbar);
