import React from "react";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import List from "../components/settings/List";

export default function Settings() {
  return (
    <>
      
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <List />
          </Box>
        
    </>
  );
}
