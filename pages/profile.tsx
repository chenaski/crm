import { GetServerSideProps, NextPage, NextPageContext } from "next";

import { ProfileCard } from "../components/ProfileCard";
import { Page } from "../components/Page";
import { User } from "../global";
import { AUTH_COOKIE } from "../core/constants";
import { userStore } from "../core/UserStore";
import { authProcessor } from "../core/AuthProcessor";

export interface ProfilePageProps {
  user?: User;
}
const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  console.log(user);

  return (
    <Page title={"Profile"}>
      <ProfileCard />
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ res, req }) => {
  const user = await authProcessor.getUserFromRequest(req);

  if (!user) {
    res.writeHead(302, { Location: "/sign-up" });
    res.end();
    return { props: {} };
  }

  return { props: { user } };
};

export default ProfilePage;
