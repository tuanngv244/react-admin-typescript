import React from "react";
import { useLocation } from "react-router-dom";
import { Box, List, useMediaQuery } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { toggleMobileSidebar } from "@/store/customizer/CustomizerSlice";
import { AppState } from "@/store";
import MenuItems from "./menuItems";
import NavGroup from "./NavGroup";
import NavCollapse from "./NavCollapse";
import NavItem from "./NavItem";

const SidebarMain = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));

  const customizer = useSelector((state: AppState) => state.customizer);

  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const hideMenu: any = lgUp
    ? customizer.isCollapse && !customizer.isSidebarHover
    : "";
  const dispatch = useDispatch();

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {MenuItems.map((item) => {
          //SubHeader
          if (item.subheader) {
            return (
              <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />
            );
            // If Sub Menu
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
            // Sub No Menu
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarMain;
