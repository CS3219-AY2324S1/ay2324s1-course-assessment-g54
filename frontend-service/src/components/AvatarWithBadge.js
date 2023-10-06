import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

import MaintainerIcon from "./MaintainerIcon";

const AvatarWithBadge = ({ user, sx }) => {
  return (
    <Badge
      overlap="circular"
      badgeContent={<MaintainerIcon />}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Avatar sx={sx} alt={user.name} src={user.profileImageUrl} />
    </Badge>
  );
};

export default AvatarWithBadge;
