import AccountCircle from '@mui/icons-material/AccountCircle';
import { ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useAuthenticationContext } from '../../context';

export const UserInfoAppBar = () => {

    const { userLogged } = useAuthenticationContext();

    return (
        <ListItem alignItems="center">
            <ListItemIcon>
                <AccountCircle  />
            </ListItemIcon>
            <ListItemText
                primary={userLogged?.name}
                secondary={
                    <>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {"Faixa: "}
                        </Typography>
                        {userLogged?.belt}
                    </>
                }
            />
        </ListItem>
    )
}