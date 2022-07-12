import { AppBar, Box, Button, Link as MuiLink, Toolbar } from "@mui/material";
import Link from "next/link";
import React from "react";

import { selectIsLoggedIn, signOutUser } from "~/core/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/core/store/hooks";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const HeaderLink: React.FC<{ href: string }> = ({ href, children }) => {
    return (
      <Link href={href} passHref={true}>
        <MuiLink sx={{ padding: "20px 20px" }}>{children}</MuiLink>
      </Link>
    );
  };

  const signOut = async () => {
    await dispatch(signOutUser());
  };

  return (
    <AppBar position={"static"} color={"transparent"} sx={{ boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
        <Box component={"nav"}>
          <Box component={"ul"} sx={{ display: "flex" }}>
            <HeaderLink href={"/"}>Home</HeaderLink>

            {isLoggedIn ? (
              <>
                <HeaderLink href={"/profile"}>Profile</HeaderLink>
                <Button variant="outlined" sx={{ alignSelf: "center", ml: 3 }} onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <HeaderLink href={"/sign-in"}>Sign In</HeaderLink>
                <HeaderLink href={"/sign-up"}>Sign Up</HeaderLink>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
