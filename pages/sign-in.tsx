import { NextPage } from "next";
import { Box, Container, CssBaseline } from "@mui/material";
import Head from "next/head";
import { SignIn } from "../components/SignIn";

const SignInPage: NextPage = () => {
  return (
    <>
      <CssBaseline />

      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Box sx={{ border: 1, borderRadius: 3, borderColor: "grey.300", p: 3 }} maxWidth={500}>
          <SignIn />
        </Box>
      </Container>
    </>
  );
};

export default SignInPage;
