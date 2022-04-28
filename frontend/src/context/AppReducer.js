export default (state, action) => {
    switch(action.type) {
        case "ADD_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchlist:[action.payload, ...state.watchlist ]
            }
        case "ADD_TV_TO_WATCHLIST":
            return {
                ...state,
                tvwatchlist:[action.payload, ...state.tvwatchlist ]
            }
        case "ADD_TV_TO_WATCHED":
            return {
                ...state,
                tvwatched:[action.payload, ...state.tvwatched ]
            }
        case "ADD_MOVIE_TO_WATCHED":
        return {
            ...state,
            watched:[action.payload, ...state.watched ]
        }


        case "REMOVE_TV_TO_WATCHED":
            return {
                ...state,
                tvwatched: state.tvwatched.filter(movie => movie.id!==action.payload)
            }
        case "REMOVE_MOVIE_TO_WATCHED":
            return {
                ...state,
                watched: state.watched.filter(movie => movie.id!==action.payload)
            }



        case "REMOVE_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter(movie => movie.id!==action.payload)
            }
        case "REMOVE_TV_TO_WATCHLIST":
            return {
                ...state,
                tvwatchlist: state.tvwatchlist.filter(movie => movie.id!==action.payload)
            }
        case "FAVOURITE_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                favourite: [action.payload, ...state.favourite]
            }
        case "REMOVE_FAVOURITE_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                favourite:state.favourite.filter((movie) => movie.id !== action.payload)
            }
        case "FAVOURITE_TV_TO_WATCHLIST":
                return {
                    ...state,
                    tvfavourite: [action.payload, ...state.tvfavourite]
                }
        case "REMOVE_FAVOURITE_TV_TO_WATCHLIST":
                return {
                    ...state,
                    tvfavourite:state.tvfavourite.filter((movie) => movie.id !== action.payload)
                }
        

            
        default:
            return state;
    }
}