import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, Container, Divider, IconButton, Menu, Toolbar, Tooltip, Typography } from '@mui/material';
import { useAppThemeContext } from '../../context';
import { useMenuAppBar } from '../../hooks/useMenuAppBar';
import { pages } from '../../routes/Rotas';
import { LogoutAppBar } from './LogoutAppBar';
import { MenuItemAppBar } from './MenuItemAppBar';
import { ToggleThemeSetting } from './ToggleThemeSetting';
import { UserInfoAppBar } from './UserInfoAppBar';

export const MenuAppBar = () => {

  const { anchorElNav, anchorElUser, handleOpenNavMenu, handleOpenUserMenu, handleCloseNavMenu, handleCloseUserMenu } = useMenuAppBar();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mx: 1 }} >
            <img alt='Logo' src={'./android-chrome-512x512.png'} width={55} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Liga BJJ
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItemAppBar key={page.to} label={page.label} to={page.to} />
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mx: 1 }} >
            <img alt='Logo' src={'./android-chrome-512x512.png'} width={45} />
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Liga BJJ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <MenuItemAppBar key={page.to} label={page.label} to={page.to} isButton />
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1, border: 1, borderColor: 'background.default' }}>
                <Avatar alt="BJJ" src={`nfe.png`} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <UserInfoAppBar />
              <ToggleThemeSetting />
              <Divider />
              <LogoutAppBar />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )

}