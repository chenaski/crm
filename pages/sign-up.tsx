import { Box } from "@mui/material";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

import { AuthProcessor } from "~/core/helpers/AuthProcessor";
import { fetchUser } from "~/core/store/features/user/userSlice";
import { wrapper } from "~/core/store/store";

import { Page } from "~/components/Page";
import { SignUp } from "~/components/SignUp";

const SignUpPage: NextPage = () => {
  return (
    <Page title={"Sign Up"}>
      <Box sx={{ border: 1, borderColor: "grey.300", borderRadius: 2, p: 3 }} width={500}>
        <SignUp />
      </Box>
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const userId = AuthProcessor.getUserIdFromRequest(req);

  if (userId) {
    await store.dispatch(fetchUser({ id: userId, cookie: AuthProcessor.buildAuthCookie(userId) }));
  }

  const { user } = store.getState();

  if (user.isLoggedIn) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
});

export default SignUpPage;
