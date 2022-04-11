import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export const SignIn = () => {
  return (
    <>
      <Typography component={"h1"} variant={"h5"}>
        Sign In
      </Typography>

      <Box component={"form"} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label={"Email"} type={"email"} variant={"outlined"} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label={"Password"} type={"password"} variant={"outlined"} fullWidth />
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
