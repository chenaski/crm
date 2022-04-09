import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export const SignUp = () => {
  return (
    <>
      <Typography component={"h1"} variant="h5">
        Sign Up
      </Typography>

      <Box component={"form"} sx={{ mt: 3 }}>
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
