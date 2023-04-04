import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import EditProfileForm from "./Profile/EditProfileForm";
import axios from "axios"
import { useEffect } from "react";
import { Fade } from "@mui/material";
import { alert } from "./SharedComponents/alert";

import { Authaction } from '../Redux/reducers/Authreducer'
const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const stateData = useSelector(state => state)
  const [updateOpen, setUpdateOpen] = React.useState(stateData.Auth.isOpen)
  const dispatch = useDispatch()

  // const dopen = stateData.isOpen  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [userRow, setUserRow] = React.useState();
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [images, setImages] = React.useState([]);


  const updateData = (formdata, id) => {
    axios
      .put(`http://localhost:3001/users/${id}`, formdata)
      .then((resp) => {
        console.log(resp, "upadeFacilityType");
        const updatedData = resp.data
        if(typeof  updatedData === "object"){
          sessionStorage.setItem("email",updatedData.email)
          sessionStorage.setItem("firstName",updatedData.firstName)
          sessionStorage.setItem("lastName",updatedData.lastName)
          sessionStorage.setItem("mobile",updatedData.mobile)
          sessionStorage.setItem("id",updatedData.id)
          sessionStorage.setItem("avatar",updatedData.image[0].data_url)
        }

        alert('success','User information successfully updated')
        
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        alert('error','Internal server error')
      });
  };
  const onSave = async (data) => {
    
    if (data?.id) {
      console.log(data,"Edit Profile Form Data")
      updateData(data, data?.id)

      // const response = dispatch(updateUsers(data))
      // console.log(response, "response ")
      
    }
  }

  useEffect(() => {
    const getUserDetails = async () => {
      const userId = sessionStorage.getItem("id")
      const userInfo = await axios.get("http://localhost:3001/users")
      const finalData = await userInfo.data
      const editUser = finalData.find((user) => user.id === userId)
      console.log(editUser, "Edit User")
      setUserRow(editUser)
      setImages(editUser.image)
    }
    getUserDetails()
  }, [sessionStorage.getItem("id"),open])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuCloses = () => {

    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMenuClose = () => {
    navigate('/profile')
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleEdit = () => {
    setOpen(true)
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  const handleSignOut = () => {

  sessionStorage.clear()
  dispatch(Authaction.logout())
    navigate('/login')
    alert('success', 'User is successfully Logout')
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      // keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuCloses}
      style={{ marginTop: "35px", marginLeft: "-10px" }}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleEdit}>Edit Profile</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}
          elevation={1}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => {
                setUpdateOpen(stateData.Auth.isOpen ? dispatch(Authaction.sidebarClose()) : dispatch(Authaction.sidebarOpen()))
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              React Biolerplate
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                disableRipple
              >
                <img src={sessionStorage.getItem("avatar")} style={{ width: "40px", height: "40px", borderRadius: "100%", marginRight: "15px" }} />
                <Typography variant="body1" >Welcome {sessionStorage.getItem("firstName")}</Typography>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <EditProfileForm
        open={open}
        setOpen={setOpen}
        userRows={userRow}
        save={onSave}
        images={images}
        setImages={setImages}
      />
    </>
  );
}
