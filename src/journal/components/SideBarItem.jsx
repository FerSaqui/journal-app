import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { TurnedInNot } from '@mui/icons-material';
import React from "react";
import { useMemo } from "react";
import { useDispatch } from 'react-redux';
import { setActiveNote } from "../../store/journal/journalSlice";

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {
    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) );
    }

    const newTitle = useMemo(() => { 
        return title.length > 17
        ? title.substring(0,17) + "..."
        : title;
    }, [ title ]);

    const newBody = useMemo(() => { 
        return body.length > 17
        ? body.substring(0,17) + "..."
        : body;
    }, [ body ]);

  return (
    <ListItem disablePadding onClick={ onClickNote }>
      <ListItemButton>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
        </Grid>
        <Grid container>
            <ListItemText secondary={ newBody } />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
