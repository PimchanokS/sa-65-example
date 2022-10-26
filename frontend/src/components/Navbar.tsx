import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  const menu = [
    { name: "หน้าแรก", icon: <HomeIcon  />, path: "/" },
    { name: "ข้อมูลห้อง", icon: <BedroomParentIcon  />, path: "/room" },
    { name: "บันทึกรายละเอียดห้อง", icon: <AssignmentIcon  />, path: "/create" },
  ]
  const [openDrawer, setOpenDrawer] = React.useState(false);
  
  const toggleDrawer = (state: boolean) => (event: any) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpenDrawer(state);
  }

  const SignOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }

 return (
  
   <Box sx={{ flexGrow: 1 }}>
     <AppBar position="static">
       <Toolbar>
         <IconButton
           onClick={toggleDrawer(true)} 
           size="large"
           edge="start"
           color="inherit"
           aria-label="menu"
           sx={{ mr: 2 }}
         >
           <MenuIcon />
         </IconButton>
         <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
            <List 
              onClick={toggleDrawer(false)} 
              onKeyDown={toggleDrawer(false)}
            >
              {menu.map((item, index) => (
                <ListItem key={index} button component={RouterLink} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              ))}
              <ListItem button onClick={SignOut}>
              <ListItemIcon> <ExitToAppIcon/></ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
              </ListItem>

            </List>
          </Drawer>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           ระบบจองใช้ห้อง
         </Typography>
       </Toolbar>
     </AppBar>
   </Box>

 );
}
export default Navbar;