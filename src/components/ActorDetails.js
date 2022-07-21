import Grid from '@mui/material/Box';
import {
    appendMovies,
    updateIsLoading,
} from "../reducer/cinemaReducer";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import * as React from "react";
import {get} from "../adaptors/http";
import {useEffect} from "react";
import {Button, Typography} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Actor from "./Actor";
import Movie from "./Movie";
import {useNavigate} from "react-router-dom";

const ActorDetails = () => {
    const selectedActor = useSelector(state => state.cinema.selectedActor);
    const movies = useSelector(state => state.cinema.movies);
    const isLoading = useSelector(state => state.cinema.isLoading);
    const dispatch = useDispatch();

    const actorId = selectedActor.id;

    let navigate = useNavigate();

    useEffect(() => {
        console.log(selectedActor, movies);
        dispatch(updateIsLoading(true));
        getMovies();
    }, []);

    const getMovies = () => {
        get(`actors/${actorId}/movies`).then(data => {
            dispatch(appendMovies(data));
            dispatch(updateIsLoading(false));
        }).catch(err => {
            navigate(`/`);
            console.log('Error loading movies - ', err.message);
        })
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
                        {selectedActor.first_name} {selectedActor.last_name}
                    </Typography>
                </Grid>
                <Grid container xs={12} sm={6}>
                    <Grid item xr={12} sm={6} md={4} style={{
                        cursor: "pointer",
                        marginTop: "3vh",
                        marginLeft: "33vw",
                        maxWidth: "33vw",
                    }}>
                        <Actor actor={selectedActor} index={1}/>
                    </Grid>
                    <Grid item xs={2} style={{
                        cursor: "pointer",
                        marginTop: "3vh",
                        marginLeft: "33vw",
                        maxWidth: "33vw",
                    }}>
                        <Typography gutterBottom variant="h5" component="div" style={{color:"#D61C4E"}}>
                            Movies Acted
                        </Typography>
                    </Grid>
                    {!isLoading && (
                        <Grid item xs={2} style={{
                            minHeight: "60vh",
                            maxHeight: "60vh",
                            marginLeft: "33vw",
                            maxWidth: "33vw",
                            overflow: "scroll"
                        }}>
                            {
                                movies[actorId]?.map((movie, index) => {
                                    return (
                                        <Box>
                                            <Movie movie={movie} index={index}/>
                                        </Box>
                                    )
                                })
                            }
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12} style={{maxHeight: "20vh", justifyContent: "end", display: "flex"}}>
                    <Button
                        style={{marginRight: "50px"}}
                        variant="contained" onClick={() => {
                        navigate(`/add-movie`);
                    }}>Add Movie</Button>
                </Grid>
                {isLoading && (
                    <Grid item xs={12} style={{minHeight: "70vh"}}>
                        <CircularProgress/>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default ActorDetails;