import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { SignInInput } from "~/server/dto/sign-in-input";

import { selectError, selectIsLoggedIn, signInUser } from "~/core/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/core/store/hooks";

export const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const error = useAppSelector(selectError);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: SignInInput = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    await dispatch(signInUser(data));
  };

  useEffect(() => {
    (async () => {
      isLoggedIn && (await router.push("/profile"));
    })();
  }, [router, isLoggedIn]);

  return (
    <>
      <Typography component={"h1"} variant={"h5"}>
        Sign In
      </Typography>

      <Box component={"form"} sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label={"Email"} name={"email"} type={"email"} fullWidth autoFocus />
          </Grid>
          <Grid item xs={12}>
            <TextField label={"Password"} name={"password"} type={"password"} fullWidth />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button type={"submit"} variant={"contained"} color={"primary"} fullWidth>
            Sign In
          </Button>
        </Box>

        {error && (
          <Typography mt={2} fontSize={14} color={"error.main"}>
            {error}
          </Typography>
        )}
      </Box>
    </>
  );
};
