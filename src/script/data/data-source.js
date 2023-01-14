import axios from 'axios';
import DbMovieKey from './api-collection';

class DataSource {
  static getBasicData() {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = DbMovieKey;

    return new Promise((resolve, reject) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
      const requestCountry = axios.get(`${baseUrl}/configuration/languages?api_key=${apiKey}`);
      const requestWeeklyTrend = axios.get(`${baseUrl}/trending/movie/day?api_key=${apiKey}`);

      axios.all([
        requestGenre,
        requestCountry,
        requestWeeklyTrend,
      ])
        .then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;
            const responseCountry = responseJson[1].data;
            const responseWeekTrend = responseJson[2].data.results;

            if (responseWeekTrend) {
              resolve([
                responseGenre,
                responseCountry,
                responseWeekTrend,
              ]);
            } else {
              reject(new Error('no weekly trending movies found'));
            }
          }),
        );
    });
  }

  static discoveryMovie(page, sort, year, genre, minVote, lang = '') {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = '2549c839db5e074878d2577ca548bc87';

    return new Promise((resolve, reject) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
      const requestDiscover = axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=${sort}&vote_average.gte=${minVote}&page=${page}&primary_release_year=${year}&with_genres=${genre}&with_original_language=${lang}`);

      axios.all([
        requestGenre,
        requestDiscover,
      ])
        .then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;
            const responseDiscover = responseJson[1].data.results;

            if (responseDiscover[0]) {
              resolve([
                responseGenre,
                responseDiscover,
              ]);
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject('No movies filtered!');
            }
          }),
        );
    });
  }

  static favoriteMovie(page) {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = '2549c839db5e074878d2577ca548bc87';

    return new Promise((resolve, reject) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
      const requestFavorite = axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}&page=${page}`);

      axios.all([
        requestGenre,
        requestFavorite,
      ])
        .then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;
            const responseFavorite = responseJson[1].data.results;

            if (responseFavorite[0]) {
              resolve([
                responseGenre,
                responseFavorite,
              ]);
            } else {
              reject(new Error('no favorite movies found'));
            }
          }),
        );
    });
  }

  static getGenreList() {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = '2549c839db5e074878d2577ca548bc87';

    return new Promise((resolve, reject) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);

      axios.all([
        requestGenre,
      ])
        .then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;

            if (responseGenre) {
              resolve([
                responseGenre,
              ]);
            } else {
              reject(new Error('no genres found'));
            }
          }),
        );
    });
  }
}

export default DataSource;
