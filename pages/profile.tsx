import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { AuthProcessor } from "~/core/helpers/AuthProcessor";
import { fetchUser, selectIsLoggedIn, selectUser } from "~/core/store/features/user/userSlice";
import { useAppSelector } from "~/core/store/hooks";
import { wrapper } from "~/core/store/store";

import { Page } from "~/components/Page";
import { ProfileCard } from "~/components/ProfileCard";

const ProfilePage: NextPage = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  useEffect(() => {
    (async () => {
      !isLoggedIn && (await router.push("/sign-up"));
    })();
  }, [isLoggedIn, router]);

  return <Page title={"Profile"}>{user && <ProfileCard user={user} />}</Page>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const userId = AuthProcessor.getUserIdFromRequest(req);

  if (userId) {
    await store.dispatch(fetchUser({ id: userId, cookie: AuthProcessor.buildAuthCookie(userId) }));
  }

  const { user } = store.getState();

  if (!user.isLoggedIn) {
    return { redirect: { destination: "/sign-up", permanent: false } };
  }

  return { props: {} };
});

export default ProfilePage;
