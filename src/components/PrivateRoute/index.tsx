import { Paths } from "@/constants/paths";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  redirectTo: string;
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = Paths.AUTHENTICATION,
  element,
}) => {
  // TODO: handle get token for condition
  return true ? element : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
