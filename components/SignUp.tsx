import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { SignUpInput } from "~/server/dto/sign-up-input";

import { selectIsLoggedIn, signUpUser } from "~/core/store/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "~/core/store/hooks";

export const SignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const signUpData: SignUpInput = {
      firstName: event.currentTarget["first-name"].value,
      lastName: event.currentTarget["last-name"].value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    await dispatch(signUpUser(signUpData));
  };

  useEffect(() => {
    (async () => {
      isLoggedIn && (await router.push("/profile"));
    })();
  }, [router, isLoggedIn]);

  return (
    <>
      <Typography component={"h1"} variant="h5">
        Sign Up
      </Typography>

      <Box component={"form"} sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="first-name" label="First Name" required fullWidth autoFocus />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField name="last-name" label="Last Name" required fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField name="email" label="Email" type="email" required fullWidth />
          </Grid>

          <Grid item xs={12}>
            <TextField name="password" label="Password" type="password" required fullWidth />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button type="submit" fullWidth variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </Box>
    </>
  );
};
