import axiosClient from "./axiosClient";

export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    
    top_rated: 'top_rated',
    popular: 'popular',
    on_the_air: 'on_the_air'
}

const tmdbApi = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, {params: {}});
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, {params: {}});
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, {params: {}});
    },
    getKeyword: (cate, id) => {
        const url = category[cate] + '/' + id ;
        return axiosClient.get(url, {params: {}});
    },
    getTrending: (type, media, time, params) => {
        const url = type + '/' + media + '/' + time;
        return axiosClient.get(url, params);
    },
    getPlaying: (cate, type) => {
        const url = category[cate] + '/'+type;
        return axiosClient.get(url, {params: {}})
    },
    getPerson: ( params) => {
        const url = 'person/popular';
        return axiosClient.get(url, params);
    },
    searchKeyword: (params) => {
        const url ='/search/keyword'
        return axiosClient.get(url, params)
    }
}

export default tmdbApi;
///account/{account_id}/watchlist/movies