import { createSlice } from '@reduxjs/toolkit'
import { updateActors, updateMovies, updatePageCount} from './util';

export const cinemaCLice = createSlice({
    name: 'counter',
    initialState: {
        actors: {},
        movies: {},
        actorOffset: 0,
        actorLimit: 10,
        pageCount: 2,
        isLoading: false,
        selectedPage: 1,
        selectedActor: {}
    },
    reducers: {
        appendActors: (state, action) => {
            state.actors = updateActors(state.actors, action.payload);
        },
        appendMovies: (state, action) => {
            state.movies = updateMovies(state.movies, action.payload);
        },
        updateActorOffset: (state, action) => {
            state.actorOffset = action.payload;
        },
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateActorCount: (state, action) => {
            state.pageCount = updatePageCount(action.payload);
        },
        updateSelectedPage: (state, action) => {
            state.selectedPage = action.payload;
        },
        setSelectedActor: (state, action) => {
            state.selectedActor = action.payload;
        }
    }
})

export const {
    appendActors,
    appendMovies,
    updateActorOffset,
    updateIsLoading,
    updateActorCount,
    updateSelectedPage,
    setSelectedActor
} = cinemaCLice.actions

export default cinemaCLice.reducer


