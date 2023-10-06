import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

import MaintainerIcon from "./MaintainerIcon";

const AvatarWithBadge = ({ user, sx }) => {
  return (
    <Box overflow="visible">
      <Badge
        overlap="circular"
        badgeContent={<MaintainerIcon />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Avatar sx={sx} alt={user.name} src={user.profileImageUrl} />
      </Badge>
    </Box>
  );
};

export default AvatarWithBadge;
