import axios from './axios';

function searchMovie(search_title, country_code) {
    console.log("exec once");
    const options = {
        method: 'GET',
        url: 'search/title',
        params: {   
            title: search_title,
            country: country_code,
            show_type: 'movie'
        }
    };

    axios.request(options).then(function (response) {
        setMovies(response.data.result);
        console.log("movies");
    }).catch(function (error) {
        console.error(error);
    });
}