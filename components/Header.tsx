import { AppBar, Box, Link as MuiLink, Toolbar } from "@mui/material";
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  const HeaderLink: React.FC<{ href: string }> = ({ href, children }) => {
    return (
      <Link href={href} passHref={true}>
        <MuiLink sx={{ padding: "20px 20px" }}>{children}</MuiLink>
      </Link>
    );
  };

  return (
    <AppBar position={"static"} color={"transparent"} sx={{ boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Box component={"nav"}>
          <Box component={"ul"} sx={{ display: "flex" }}>
            <HeaderLink href={"/"}>Home</HeaderLink>

            <HeaderLink href={"/sign-in"}>Sign In</HeaderLink>

            <HeaderLink href={"/sign-up"}>Sign Up</HeaderLink>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
