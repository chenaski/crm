import { Box } from "@mui/material";
import type { NextPage } from "next";

import { SignUp } from "../components/SignUp";
import { Page } from "../components/Page";
import { GetServerSideProps } from "next";
import { authProcessor } from "../core/AuthProcessor";

const SignUpPage: NextPage = () => {
  return (
    <Page title={"Sign Up"}>
      <Box sx={{ border: 1, borderColor: "grey.300", borderRadius: 2, p: 3 }} width={500}>
        <SignUp />
      </Box>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const user = await authProcessor.getUserFromRequest(req);

  if (user) {
    res.writeHead(302, {
      Location: "/profile",
    });
    res.end();
  }

  return {
    props: {},
  };
};

export default SignUpPage;
