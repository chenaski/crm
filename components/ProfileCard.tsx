import { Box, Card, Link as MuiLink, Typography } from "@mui/material";
import { dateProcessor } from "../core/DateProcessor";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import Avatar from "boring-avatars";

export const ProfileCard = () => {
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
        Updated {dateProcessor.getDateSince(new Date(Date.now() - 5 * 1000 * 60 * 60 * 24))}
        <EditIcon sx={{ ml: 1, fontSize: 14, position: "relative", top: 1 }} />
        <Link href={"/profile/edit"}>
          <MuiLink
            sx={{ position: "absolute", top: 0, right: 0, width: 45, height: 45, cursor: "pointer" }}
            arai-label={"Go to edit profile page"}
          />
        </Link>
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar size={60} name="First Name" variant="marble" />
        <Box sx={{ ml: 2 }}>
          <Typography variant={"h6"}>First/Last Name</Typography>
          <Typography>Email</Typography>
        </Box>
      </Box>
    </Card>
  );
};
