import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { useUser } from "../contexts/UserContext";

const AvatarWithBadge = () => {

  const user = useUser();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      transform: 'scale(.7)',
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  return (
    <StyledBadge
      badgeContent=""
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
      fontSize="small"
    >
      <Avatar sx={{ width: 54, height: 54 }} alt={user.name} src={user.profileImageUrl} />
    </StyledBadge>
  )
}

export default AvatarWithBadge;
