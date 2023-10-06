import Tooltip from "@mui/material/Tooltip";

import BuildCircleIcon from "@mui/icons-material/BuildCircle";

const MaintainerIcon = () => {
  return (
    <Tooltip title="This user has maintainer permissions.">
      <BuildCircleIcon
        sx={{ backgroundColor: "rgba(20, 28, 47, 1)", borderRadius: "50%" }}
        color="disabled"
      />
    </Tooltip>
  );
};

export default MaintainerIcon;
