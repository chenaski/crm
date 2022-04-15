import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

import { Nullable, SignInData } from "../global";

export const SignIn = () => {
  const signIn = async (data: Nullable<SignInData>) => {
    return fetch("/api/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((res) => res.json());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: SignInData = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    const result = await signIn(data);

    console.log(result);
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
