import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { useIsLogout } from "../hooks/useGetLogout";
import {useIsLoggedIn} from "../hooks/useGetIsLoggedIn";
import logo from '../assets/logo.png';

// const pages = ["Groups", "Events", "Members"];
const pages = [
  {
    name: "Groups",
    linkTo: "/groups",
  },
  {
    name: "Events",
    linkTo: "/events",
  },
  {
    name: "Memebers",
    linkTo: "/members",
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const {mutateAsync: logout, isPending} = useIsLogout();
  const { data: user, isLoading: isuserloading } = useIsLoggedIn();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handelLogout = async () => {
    await logout()
      Cookies.remove("token", {path: "/"});
      navigate("/login");

  }
  if(isuserloading){
    return <div>Loading.....</div>;
  }



  return (
    <AppBar style={{ backgroundColor: '#9868ad'}} position="static" sx={{mb:5}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <Box
              component="img"
              sx={{
                height: 70,
                width: 70,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
                marginRight: 2,
                marginLeft:-2

              }}
              alt="Eventify"
              src={logo}
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {/* Eventify */}
          </Typography>
            {(user.isLoggedIn==true)? (
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((item, index) => (
                <MenuItem  key={index} href={item.linkTo} onClick={handleCloseNavMenu}>
                  <Link style={{ color: 'black', textDecoration: 'none'}} href={item.linkTo}>

                {item.name}
                </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        ): ("")  }
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Eventify
          </Typography>
          {(user.isLoggedIn==true)? (
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((item, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                href={item.linkTo}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          ):""}
          {(user.isLoggedIn==true)? (

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt={user.email} src="/static/images/avatar/2.jpg" /> */}
                <img
                  src="/avatar.png"
                  alt={user.email}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '100%',
                    objectFit: 'cover'
                  }}
                /> 
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

                <MenuItem >
                  <Typography textAlign="center">
                      {" "}
                      <Link
                      style={{ color: 'black', textDecoration: 'none'}}
                        href={'#'}
                        variant="body2"
                      >
                        {/* {user.name} */}
                         <small>{user.email}</small>
                      </Link>
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                      {" "}
                      <Link
                      style={{ color: 'black', textDecoration: 'none'}}
                        href={user.url}
                        variant="body2"
                      >
                        Event Calander
                      </Link>
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <Typography textAlign="center">
                      {" "}
                      <Link
                      style={{ color: 'black', textDecoration: 'none'}}
                        onClick={handelLogout}
                        variant="body2"
                      >
                        Logout
                      </Link>
                    </Typography>
                </MenuItem>
            </Menu>
          </Box>
          ):""}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
