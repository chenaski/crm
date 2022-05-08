import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { SignInData } from "~/global";

import { signInUser } from "~/core/store/features/user/userSlice";
import { useAppDispatch } from "~/core/store/hooks";

export const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: SignInData = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    const result = await dispatch(signInUser(data));

    if (!result.payload.error) {
      await router.push("/profile");
    }
  };

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
      </Box>
    </>
  );
};
