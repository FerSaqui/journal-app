import React from 'react'
import { JournalLayout } from '../layout/JournalLayout'
import { NothingSelectedView } from '../views/NothingSelectedView'
import { NoteView } from '../views/NoteView'
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {
  const { isSaving, activeNote } = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const onclickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <>
      <JournalLayout>
        
        {
          (!!activeNote)
          ? <NoteView />
          : <NothingSelectedView />
        }

        <IconButton
          onClick={ onclickNewNote }
          size='large'
          sx={{
              color: "white",
              backgroundColor: "error.main",
              ":hover": { backgroundColor: "error.main", opacity: 0.9 },
              position: "fixed",
              right: 50,
              bottom: 50
          }}
          disabled={ isSaving }
        >
          <AddOutlined sx={{ fontSize: 30 }}/>
        </IconButton>
      </JournalLayout>
    </>
  )
}
