import Grid from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import * as React from "react";
import {post} from "../adaptors/http";
import {useEffect, useState} from "react";
import {Button, IconButton, Snackbar, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from "react-router-dom";
import * as PropTypes from "prop-types";

import TextField from '@mui/material/TextField';
import SimpleDatePicker from "./SimpleDatePicker";
import Actor from "./Actor";

class CloseIcon extends React.Component {
    render() {
        return null;
    }
}

CloseIcon.propTypes = {fontSize: PropTypes.string};

const CreateMovie = () => {
    const selectedActor = useSelector(state => state.cinema.selectedActor);
    const movies = useSelector(state => state.cinema.movies);
    const isLoading = useSelector(state => state.cinema.isLoading);
    const dispatch = useDispatch();

    const actorId = selectedActor.id;

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
    }, []);

    const handleClose = () => {
        setOpen(false);
        navigate(`/`);
    }
    const createMovie = () => {
        post(`/actors/${actorId}/movies`, {
            name,
            releaseDate
        }).then(data => {
            setOpen(true);
        }).catch(err => {
            navigate(`/`);
            console.log('Error creating movie - ', err.message);
        })
    }

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                SUCCESS
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const handleChange = (payload, key) => {
        switch (key){
            case 'name':
                setName(payload.target.value);
                break;
            case 'date':
                const date =  getFormattedDate(payload);
                console.log(date)
                setReleaseDate(date);
                break;
        }
        console.log(payload.target.value, key)
    }

    const getFormattedDate = (date) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;
        let day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        return year + '-'+ month + '-' + day;
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={0}>
                <Grid item xs={12} style={{
                    maxHeight: "10vh",
                    minHeight: "4vh",
                    backgroundColor: "#003865",
                    display: "flex",
                    paddingTop: "1vh"
                }}>
                    <ArrowBackIosIcon style={{
                        display: "flex",
                        color: "#FFFFFF",
                        marginLeft: "20px",
                        marginTop: "3px"
                    }} onClick={() => {
                        navigate(`/`);
                    }}/>
                    <Typography variant="h5" component="h2" style={{
                        display: "flex",
                        color: "#FFFFFF",
                        marginLeft: "20px"
                    }}>
                        Create Movie
                    </Typography>
                </Grid>
                <Grid container xs={12} sm={6} style={{
                    marginTop:"5vh",
                    marginBottom:"5vh",
                    marginLeft:"10vw",
                }}>
                    <Grid item xr={12} sm={6} md={4} style={{
                        cursor: "pointer",
                        marginTop: "3vh",
                        marginLeft: "10px",
                        maxWidth: "33vw",
                    }}>
                        <Actor actor={selectedActor} index={1}/>
                    </Grid>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                id="outlined-error"
                                label="Movie Name"
                                placeholder= "Beauty and the beast"
                                onChange={(x) => {
                                    handleChange(x, 'name');
                                }}
                            />
                            <SimpleDatePicker handleChange={handleChange}/>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} style={{maxHeight: "20vh", justifyContent: "end", display: "flex"}}>
                    <Button
                        style={{marginRight: "13vw"}}
                        variant="contained" onClick={() => {
                        createMovie();
                    }}>Create</Button>
                </Grid>
                {isLoading && (
                    <Grid item xs={12} style={{minHeight: "70vh"}}>
                        <CircularProgress/>
                    </Grid>
                )}
            </Grid>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Actor created"
                action={action}
            />
        </Box>
    )
}

export default CreateMovie;