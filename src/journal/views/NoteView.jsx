import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react'
import { ImageGallery } from '../components/ImageGallery';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import Swal from 'sweetalert2';
import "sweetalert2/dist/sweetalert2.css"

export const NoteView = () => {
    const dispatch = useDispatch();
    const { activeNote, savedMessage, isSaving } = useSelector(state => state.journal);
    const { body, title, id, date, onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if(savedMessage.length > 0){
            Swal.fire("Nota actualizada", savedMessage, "success");
        }
    }, [savedMessage])
    
    
    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        if(target.files.length === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDeleteNote = () => {
        dispatch(startDeletingNote());
    }

    const fileInputRef = useRef();

    return (
        <Grid className='animate__animated animate__fadeIn animate__faster' container direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{ dateString }</Typography>
            </Grid>
            
            <Grid item>

                <input
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                />

                <IconButton
                    color='primary'
                    disabled={ isSaving }
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button disabled={ isSaving } onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder='Ingrese un título'
                    label="Título"
                    sx={{ border: "none", mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder='¿Qué sucedió hoy?'
                    sx={{ border: "none", mb: 1 }}
                    minRows={10}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid
                container
                justifyContent={"end"}
            >
                <Button
                    onClick={onDeleteNote}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            {/**Galería de imágenes */}
            <ImageGallery images={ activeNote.imageUrls }/>
        </Grid>
    )
    };