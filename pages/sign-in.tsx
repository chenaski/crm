import { Box } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";

import { authProcessor } from "../core/AuthProcessor";

import { Page } from "../components/Page";
import { SignIn } from "../components/SignIn";

const SignInPage: NextPage = () => {
  return (
    <Page title={"Sign In"}>
      <Box sx={{ border: 1, borderColor: "grey.300", borderRadius: 2, p: 3 }} width={500}>
        <SignIn />
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

export default SignInPage;
