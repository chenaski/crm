import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

import { Nullable, User } from "../global";

type SignUpData = Pick<User, "firstName" | "lastName" | "email"> & {
  password: string;
};

export const SignUp = () => {
  const signUp = async (data: Nullable<SignUpData>) => {
    return fetch("/api/sign-up", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((res) => res.json());
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const signUpData: SignUpData = {
      firstName: data.get("first-name") as string,
      lastName: data.get("last-name") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
    };
    const result = await signUp(signUpData);

    console.log(result);
  };

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
