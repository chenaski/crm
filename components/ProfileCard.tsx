import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, Link as MuiLink, Typography } from "@mui/material";
import Avatar from "boring-avatars";
import Link from "next/link";
import React from "react";

import { User } from "../global";

import { dateProcessor } from "../core/helpers/DateProcessor";

export interface ProfileCardProps {
  user: User;
}
export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <Card sx={{ p: 3, width: 500, position: "relative" }}>
      <Typography
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: 12,
          color: "grey.600",
          display: "flex",
          alignItems: "center",
        }}
      >
        Updated {dateProcessor.getDateSince(new Date(user.createdAt))}
        <EditIcon sx={{ ml: 1, fontSize: 14, position: "relative", top: 1 }} />
        <Link href={"/profile/edit"} passHref={true}>
          <MuiLink
            sx={{ position: "absolute", top: 0, right: 0, width: 45, height: 45, cursor: "pointer" }}
            arai-label={"Go to edit profile page"}
          />
        </Link>
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar size={60} name="First Name" variant="marble" />
        <Box sx={{ ml: 2 }}>
          <Typography variant={"h6"}>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography>{user.email}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
