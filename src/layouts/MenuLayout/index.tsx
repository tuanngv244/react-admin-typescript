import React from "react";
import { Outlet } from "react-router-dom";

const MenuLayout: React.FC = () => {
  return (
    <div className="MenuLayout">
      <Outlet />
    </div>
  );
};

export default MenuLayout;
