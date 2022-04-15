import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { User } from "../global";

import { authProcessor } from "../core/AuthProcessor";

import { Page } from "../components/Page";
import { ProfileCard } from "../components/ProfileCard";

export interface ProfilePageProps {
  user?: User;
}
const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!user) {
        await router.replace("/sign-up");
      }
    })();
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <Page title={"Profile"}>
      <ProfileCard user={user} />
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
