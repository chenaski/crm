import { NextPage } from "next";
import { Container, CssBaseline } from "@mui/material";
import Head from "next/head";
import { ProfileCard } from "../components/ProfileCard";

const ProfilePage: NextPage = () => {
  return (
    <>
      <CssBaseline />

      <Head>
        <title>Profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <ProfileCard />
      </Container>
    </>
  );
};

export default ProfilePage;
