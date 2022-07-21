import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {get} from "../adaptors/http";
import {
    appendActors,
    updateActorOffset,
    updateIsLoading,
    updateActorCount,
    updateSelectedPage,
    setSelectedActor
} from "../reducer/cinemaReducer";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import {Button, Pagination, Typography} from "@mui/material";
import Actor from "./Actor";

export default function Dashboard() {
    const actors = useSelector(state => state.cinema.actors);
    const selectedPage = useSelector(state => state.cinema.selectedPage);
    const pageCount = useSelector(state => state.cinema.pageCount);
    const isLoading = useSelector(state => state.cinema.isLoading);
    const actorLimit = useSelector(state => state.cinema.actorLimit);
    const actorOffset = useSelector(state => state.cinema.actorOffset);
    const dispatch = useDispatch();

    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad || true) {
            dispatch(updateIsLoading(true));
            getActors(actorOffset);
            setInitialLoad(false);
        }
    }, [actorOffset]);

    const getActors = (offset) => {
        get(`actors?limit=${actorLimit}&offset=${offset}`).then(data => {
            const actors = data['actors'];
            const actorCount = data['actorCount'];
            dispatch(appendActors(actors));
            dispatch(updateActorCount(actorCount));
            dispatch(updateIsLoading(false));
        }).catch(err => {
            console.log('Error loading movies - ', err.message);
        })
    }

    const selectActor = (actor) => {
        dispatch(setSelectedActor(actor));
        navigate(`/actor`);
    }
    const handlePagination = (event, c) => {
        const offset = actorLimit * (c - 1);
        dispatch(updateSelectedPage(c));
        dispatch(updateActorOffset(offset));
    }

    let navigate = useNavigate();

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={0}>
                <Grid item xs={12} style={{
                    maxHeight: "10vh",
                    minHeight: "5vh",
                    backgroundColor: "#003865",
                    paddingTop: "1vh",
                    paddingBottom: "1vh",
                    paddingLeft: "2vw"
                }}>
                    <Typography variant="h5" component="h2" style={{display: "flex", color: "#FFFFFF"}}>
                        Actors
                    </Typography>
                </Grid>
                {isLoading && (
                    <Grid item xs={12} style={{minHeight: "70vh"}}>
                        <CircularProgress/>
                    </Grid>
                )}
                {!isLoading && (
                    <Grid container spacing={4}>
                        <Grid container xs={12} style={{
                            maxHeight: "80vh",
                            minHeight: "10vh",
                            marginTop: "50px",
                            overflow: "scroll",
                            marginLeft: "10vw"
                        }}>
                            {
                                Object.values(actors).map((actor, index) => {
                                    return (
                                        <Grid item xr={12} sm={6} md={4} style={{cursor: "pointer"}}
                                              onClick={() => selectActor(actor)}>
                                            <Actor actor={actor} index={index + 1}/>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        <Grid item xs={12} style={{maxHeight: "10vh", justifyContent: "end", display: "flex"}}>
                            <Pagination count={pageCount} page={selectedPage} onChange={handlePagination}/>
                        </Grid>
                        <Grid item xs={12} style={{maxHeight: "20vh", justifyContent: "end", display: "flex"}}>
                            <Button
                                style={{marginRight: "50px"}}
                                variant="contained" onClick={() => {
                                navigate(`/add-actor`);
                            }}>Add Actor</Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}