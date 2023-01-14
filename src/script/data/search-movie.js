import axios from 'axios';
import DbMovieKey from './api-collection';

class DataSearch {
  static searchMovie(query, page) {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = DbMovieKey;

    return new Promise((resolve, reject) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
      const moviebyQuery = axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`);

      axios.all([requestGenre, moviebyQuery])
        .then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;
            const responseMoviebyQuery = responseJson[1].data.results;

            if (responseMoviebyQuery[0]) {
              resolve([responseGenre, responseMoviebyQuery]);
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject('Cannot find movie!');
            }
          }),
        );
    });
  }
}

export default DataSearch;
