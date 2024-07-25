import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import { To, useNavigate } from "react-router-dom";
import { BoxHeadStyled, BoxLeftHeadStyled, ArrowStyled } from "./styled";
import Loading from "@/components/Loading";

type DetailPageLayoutProps = {
  pageTitle: string;
  renderAction?: ReactNode;
  renderContent: ReactNode;
  backPath?: string;
  isLoading?: boolean;
};

const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({
  pageTitle,
  backPath,
  renderAction,
  renderContent,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const title = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);

  return (
    <Loading isLoading={isLoading} isLoadingForPage styles={{ width: "100%" }}>
      <BoxHeadStyled>
        <BoxLeftHeadStyled>
          <ArrowStyled onClick={() => navigate((backPath || -1) as To)}>
            <ArrowBackIcon />
          </ArrowStyled>
          <h2>{title}</h2>
        </BoxLeftHeadStyled>
        {renderAction}
      </BoxHeadStyled>
      <Box>{renderContent}</Box>
    </Loading>
  );
};

export default DetailPageLayout;
