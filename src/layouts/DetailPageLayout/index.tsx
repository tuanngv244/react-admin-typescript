import Breadcrumb from "@/components/Breadcrumb";
import Loading from "@/components/Loading";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { BoxHeadStyled } from "./styled";

type DetailPageLayoutProps = {
  pageTitle: string;
  renderAction?: ReactNode;
  renderContent: ReactNode;
  isLoading?: boolean;
  breadCrumbs: { title: string; to?: string }[];
};

const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({
  pageTitle,
  renderAction,
  renderContent,
  isLoading = false,
  breadCrumbs,
}) => {
  return (
    <Loading isLoading={isLoading} isLoadingForPage styles={{ width: "100%" }}>
      <Breadcrumb title={pageTitle} items={breadCrumbs || []} />
      <BoxHeadStyled>{renderAction}</BoxHeadStyled>
      <Box>{renderContent}</Box>
    </Loading>
  );
};

export default DetailPageLayout;
