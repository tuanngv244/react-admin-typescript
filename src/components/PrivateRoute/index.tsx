import { Paths } from "@/constants/paths";
import tokenMethod from "@/utils/token";
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
  return tokenMethod.get() ? element : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
