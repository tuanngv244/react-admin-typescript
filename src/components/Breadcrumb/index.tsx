import { Box, Breadcrumbs, Grid, Link, Theme, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import { IconCircle } from "@tabler/icons-react";
import { TypographyStyled } from "./styled";
import { toUpperCaseFirstLetter } from "@/utils/transform";
import IMAGES from "@/assets/images";

interface BreadCrumbType {
  subtitle?: string;
  items: { to?: string; title: string }[];
  title: string;
  children?: JSX.Element;
}

const Breadcrumb = ({ subtitle, items, title, children }: BreadCrumbType) => (
  <Grid
    container
    sx={{
      backgroundColor: "primary.light",
      borderRadius: (theme: Theme) => theme.shape.borderRadius / 4,
      p: "30px 25px 20px",
      marginBottom: "10px",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Grid item xs={12} sm={6} lg={8} mb={1}>
      <TypographyStyled variant="h5">{title}</TypographyStyled>
      <TypographyStyled
        color="textSecondary"
        variant="h6"
        fontWeight={400}
        mt={0.8}
        mb={0}
      >
        {subtitle}
      </TypographyStyled>
      <Breadcrumbs
        separator={
          <IconCircle
            size="5"
            fill="textSecondary"
            fillOpacity={"0.6"}
            style={{ margin: "0 5px" }}
          />
        }
        sx={{ alignItems: "center", mt: items ? "10px" : "" }}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link
                    underline="none"
                    color="inherit"
                    component={NavLink}
                    to={item.to}
                  >
                    {toUpperCaseFirstLetter(item.title)}
                  </Link>
                ) : (
                  <Typography color="textPrimary">
                    {toUpperCaseFirstLetter(item.title)}
                  </Typography>
                )}
              </div>
            ))
          : ""}
      </Breadcrumbs>
    </Grid>
    <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
      <Box
        sx={{
          display: { xs: "none", md: "block", lg: "flex" },
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        {children ? (
          <Box sx={{ top: "0px", position: "absolute" }}>{children}</Box>
        ) : (
          <>
            <Box sx={{ top: "0px", position: "absolute" }}>
              <img
                src={IMAGES.breadCrumb.chatBc}
                alt={IMAGES.breadCrumb.chatBc}
                width={"165px"}
              />
            </Box>
          </>
        )}
      </Box>
    </Grid>
  </Grid>
);

export default Breadcrumb;
