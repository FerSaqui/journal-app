import Box from '@mui/material/Box';
import React from 'react'
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';
import { Toolbar } from '@mui/material';

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }} className='animate__animated animate__fadeIn animate__faster'>
        { /**Navbar */ }
        <NavBar drawerWidth={ drawerWidth }/>
        { /**Sidebar */ }
        <SideBar drawerWidth={drawerWidth}/>

        <Box
            component={"main"}
            sx={{ flexGrow: 1, p: 3 }}
        >
            { /**Toolbar */ }
            <Toolbar />

            { children }
        </Box>
    </Box>
  )
};