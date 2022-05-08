import { GetServerSideProps, NextPage } from "next";

import { AuthProcessor } from "~/core/helpers/AuthProcessor";
import { fetchUser, selectUser } from "~/core/store/features/user/userSlice";
import { useAppSelector } from "~/core/store/hooks";
import { wrapper } from "~/core/store/store";

import { Page } from "~/components/Page";
import { ProfileCard } from "~/components/ProfileCard";

const ProfilePage: NextPage = () => {
  const user = useAppSelector(selectUser);

  if (!user) {
    return null;
  }

  return (
    <Page title={"Profile"}>
      <ProfileCard user={user} />
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {
  const userId = AuthProcessor.getUserIdFromRequest(req);
  const result = userId ? await store.dispatch(fetchUser(userId)) : null;

  if (!result || result?.payload?.error) {
    return { redirect: { destination: "/sign-up", permanent: false } };
  }

  return { props: {} };
});

export default ProfilePage;
