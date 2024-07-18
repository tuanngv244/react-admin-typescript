import { FC } from "react";
import { Link } from "react-router-dom";
import { AppState } from "@/store";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";
import { SVGS } from "@/assets/icons";

const Logo: FC = () => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }));

  if (customizer?.isCollapse) {
    return (
      <LinkStyled
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <SVGS.ICLogoShort />
      </LinkStyled>
    );
  }

  return (
    <LinkStyled
      to="/"
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {customizer.activeMode === "dark" ? (
        <SVGS.ICLogoLight />
      ) : (
        <SVGS.ICLogoDark />
      )}
    </LinkStyled>
  );
};

export default Logo;
