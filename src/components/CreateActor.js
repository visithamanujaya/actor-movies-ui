import Grid from '@mui/material/Box';
import {
    appendMovies,
    updateIsLoading,
} from "../reducer/cinemaReducer";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import * as React from "react";
import {post} from "../adaptors/http";
import {useEffect, useState} from "react";
import {Button, IconButton, Snackbar, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import * as PropTypes from "prop-types";

class CloseIcon extends React.Component {
    render() {
        return null;
    }
}

CloseIcon.propTypes = {fontSize: PropTypes.string};
const CreateActor = () => {
    const isLoading = useSelector(state => state.cinema.isLoading);
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [age, setAge] = useState(null);
    const [open, setOpen] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
    }, []);

    const handleClose = () => {
        setOpen(false);
        navigate(`/`);
    }
    const createActor = () => {
        post(`/actors`, {
            firstName,
            lastName,
            age
        }).then(data => {
            setOpen(true);
        }).catch(err => {
            navigate(`/`);
            console.log('Error loading movies - ', err.message);
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
            case 'fName':
                setFirstName(payload.target.value);
                break;
            case 'lName':
                setLastName(payload.target.value);
                break;
            case 'age':
                setAge(parseInt(payload.target.value));
                break;
        }
        console.log(payload.target.value, key)
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
                        Create Actor
                    </Typography>
                </Grid>
                <Grid container xs={12} sm={6} style={{
                    marginTop:"5vh",
                    marginBottom:"5vh",
                    marginLeft:"10vw",
                }}>
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
                                label="First Name"
                                placeholder= "Jonny"
                                onChange={(x) => {
                                    handleChange(x, 'fName');
                                }}
                            />
                            <TextField
                                id="outlined-error-helper-text"
                                label="Last Name"
                                placeholder= "Depp"
                                onChange={(x) => {
                                    handleChange(x, 'lName');
                                }}
                            />
                            <TextField
                                id="outlined-error-helper-text-2"
                                label="Age"
                                placeholder= "23"
                                helperText="Enter an integer value"
                                onChange={(x) => {
                                    handleChange(x, 'age');
                                }}
                            />
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12} style={{maxHeight: "20vh", justifyContent: "end", display: "flex"}}>
                    <Button
                        style={{marginRight: "13vw"}}
                        variant="contained" onClick={() => {
                        createActor();
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

export default CreateActor;