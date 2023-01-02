import axios from 'axios';

class DataExtends {
  static getMovieDetail(movieId) {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = '2549c839db5e074878d2577ca548bc87';

    return new Promise((resolve, reject) => {
      const movieDetail = axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
      const getMovieVideos = axios.get(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
      const getCredits = axios.get(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`);

      axios.all([movieDetail, getMovieVideos, getCredits])
        .then(
          axios.spread((...responseJson) => {
            const responseMovieDetails = responseJson[0].data;
            const responseGetMovieVideos = responseJson[1].data.results[0];
            const responseGetCredits = responseJson[2].data.cast;

            if (responseMovieDetails) {
              resolve([
                responseMovieDetails,
                responseGetMovieVideos,
                responseGetCredits,
              ]);
            } else {
              reject(new Error('Cannot find some records'));
            }
          }),
        );
    });
  }

  static getRelatedMovies(movieId) {
    return new Promise((resolve, reject) => {
      const baseUrl = 'https://api.themoviedb.org/3';
      const apiKey = '2549c839db5e074878d2577ca548bc87';

      const getSimilarMovie = axios.get(`${baseUrl}/movie/${movieId}/similar?api_key=${apiKey}`);

      axios.all([getSimilarMovie])
        .then(
          axios.spread((...responseJson) => {
            const responseSimilarMovies = responseJson[0].data.results;

            if (responseSimilarMovies) {
              resolve([
                responseSimilarMovies,
              ]);
            } else {
              reject(new Error('no related movie found'));
            }
          }),
        );
    });
  }
}

export default DataExtends;
