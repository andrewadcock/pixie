import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import UserContext from "@/context/authenticationContext";
import Link from "next/link";

const settings = ["Profile", "Account", "Dashboard"];

function Header() {
  const userCtx = useContext(UserContext);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    handleCloseUserMenu();
    await userCtx.logout();
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", position: "fixed" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <h1>
            <Link href={"/"}>No, you pick!</Link>{" "}
          </h1>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: "right",
            }}
          >
            <Tooltip title="Open settings" sx={{ justifyContent: "flex-end" }}>
              {userCtx.user?.username ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userCtx.user.username}
                    src="/static/images/avatar/1.jpg"
                  />
                </IconButton>
              ) : (
                <>
                  <Link href={"/account/login/"}>Log In</Link> |{" "}
                  <Link href={"/account/register/"}>Register</Link>
                </>
              )}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link href={`/account/${setting.toLowerCase()}/`}>
                    <Typography textAlign="center">{setting}</Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem key={"logout"} onClick={handleLogout}>
                <Link href={`/`}>
                  <Typography textAlign="center">Logout</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
