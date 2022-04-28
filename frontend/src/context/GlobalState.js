import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer';

//initial State

const initialState = {

    //Movies data
    watchlist: localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')): [],
    watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')): [],
    favourite: localStorage.getItem('favourite') ? JSON.parse(localStorage.getItem('favourite')): [],
    // nowatched: localStorage.getItem('nowatched') ? JSON.parse(localStorage.getItem('nowatched')): [],

    //TV Shows data
    tvwatchlist: localStorage.getItem('tvwatchlist') ? JSON.parse(localStorage.getItem('tvwatchlist')): [],
    tvwatched: localStorage.getItem('tvwatched') ? JSON.parse(localStorage.getItem('tvwatched')): [],
    tvfavourite: localStorage.getItem('tvfavourite') ? JSON.parse(localStorage.getItem('tvfavourite')): [],
    // tvnowatched: localStorage.getItem('tvnowatched') ? JSON.parse(localStorage.getItem('tvnowatched')): [],

}


//create context
export const GlobalContext = createContext(initialState);

//provider components
export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {

        //Save Movies data
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
        localStorage.setItem('favourite', JSON.stringify(state.favourite));
        localStorage.setItem('watched', JSON.stringify(state.watched));
        // localStorage.setItem('nowatched', JSON.stringify(state.nowatched));

        //Save TV Shows data
        localStorage.setItem('tvwatchlist', JSON.stringify(state.tvwatchlist));
        localStorage.setItem('tvfavourite', JSON.stringify(state.tvfavourite));
        localStorage.setItem('tvwatched', JSON.stringify(state.tvwatched));
        // localStorage.setItem('tvnowatched', JSON.stringify(state.tvnowatched));

    }, [state])
                    //ACTIONS


// (Thêm / Remove)  Movie vào Watchlist
    const addMovieToWatchlist =( movie) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload : movie})
    }
    const removeMovieFromWatchlist = (id) => {
        dispatch({type: "REMOVE_MOVIE_TO_WATCHLIST", payload : id})
    }

// (Thêm / Remove) TV Shows vào TVWatchlist
        const addTvToWatchlist =( movie) => {
            dispatch({type: "ADD_TV_TO_WATCHLIST", payload : movie})
        }
        const removeTvFromWatchlist = (id) => {
            dispatch({type: "REMOVE_TV_TO_WATCHLIST", payload : id})
        }

// (Thêm / Remove)  Movie vào Favourite
    const addMovieToFavourite = movie => {
        dispatch({type: "FAVOURITE_MOVIE_TO_WATCHLIST", payload : movie})
    }   
    const removeMovieToFavourite = (id) => {
        dispatch({type: "REMOVE_FAVOURITE_MOVIE_TO_WATCHLIST", payload : id})
    }

    
// (Thêm / Remove) TV Show vào TVFavourite
    const addTvToFavourite = movie => {
        dispatch({type: "FAVOURITE_TV_TO_WATCHLIST", payload : movie})
    }
    const removeTvToFavourite = (id) => {
        dispatch({type: "REMOVE_FAVOURITE_TV_TO_WATCHLIST", payload : id})
    }






// (Thêm / Remove) TV Show vào TVWatched

    const addTvToWatched =( movie) => {
        dispatch({type: "ADD_TV_TO_WATCHED", payload : movie})
    }
    const removeTvFromWatched = (id) => {
        dispatch({type: "REMOVE_TV_TO_WATCHED", payload : id})
    }

// (Thêm / Remove) Movie vào Watched

    const addMovieToWatched =( movie) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHED", payload : movie})
    }
    const removeMovieFromWatched = (id) => {
        dispatch({type: "REMOVE_MOVIE_TO_WATCHED", payload : id})
    }




// (Thêm / Remove) Movie vào NoWatched

    const addMovieToNoWatched =( movie) => {
        dispatch({type: "ADD_MOVIE_TO_NOWATCHED", payload : movie})
    }
    const removeMovieFromNoWatched = (id) => {
        dispatch({type: "REMOVE_MOVIE_TO_NOWATCHED", payload : id})
    }

// (Thêm / Remove) TV Show vào NoWatched

    const addTvToNoWatched =( movie) => {
        dispatch({type: "ADD_TV_TO_NOWATCHED", payload : movie})
    }
    const removeTvFromNoWatched = (id) => {
        dispatch({type: "REMOVE_TV_TO_NOWATCHED", payload : id})
    }

    return (
        <GlobalContext.Provider
        value={{

            //Movies data
            watchlist: state.watchlist,
            favourite:state.favourite, 
            watched: state.watched ,
            // nowatched: state.nowatched,

            //TV Shows data
            tvwatchlist: state.tvwatchlist,
            tvfavourite: state.tvfavourite,
            tvwatched: state.tvwatched,
            // tvnowatched: state.tvnowatched,


            
            //Method add TV Shows
            addTvToWatchlist,
            addTvToFavourite,
            addTvToWatched,
            addTvToNoWatched,

            //Method add Movies
            addMovieToWatchlist,
            addMovieToFavourite,
            addMovieToWatched,
            addMovieToNoWatched,

            //Method remove TV Shows
            removeTvFromWatchlist,
            removeTvToFavourite,
            removeTvFromWatched,
            removeTvFromNoWatched,
            
            //Method remove Movies
            removeMovieFromWatchlist,
            removeMovieToFavourite,
            removeMovieFromWatched,
            removeMovieFromNoWatched,

        }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}