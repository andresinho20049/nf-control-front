import { MenuItem, Typography, ListItemIcon } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthenticationContext } from '../../context';

export const LogoutAppBar = () => {

    const { logout } = useAuthenticationContext();
    
    return (
        <MenuItem onClick={logout}>
            <ListItemIcon>
                <LogoutIcon />
            </ListItemIcon>
            <Typography textAlign="center">Logout</Typography>
        </MenuItem>
    )
}