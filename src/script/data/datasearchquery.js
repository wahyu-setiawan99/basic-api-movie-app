import axios from "axios";

class DataSearch {
  static searchMovie(query, page) {
    const baseUrl = `https://api.themoviedb.org/3`;
    const api_key = `2549c839db5e074878d2577ca548bc87`;

    return new Promise ((resolve, reject) => {
      const moviebyQuery = axios.get(`${baseUrl}/search/movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}`)
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${api_key}`);


      axios.all([moviebyQuery, requestGenre])
      .then(
        axios.spread((...responseJson) => {
          const responseMoviebyQuery = responseJson[0].data.results;
          const responseGenre = responseJson[1].data.genres;

          if (responseMoviebyQuery[0]) {
            resolve([responseMoviebyQuery, responseGenre]);
          } else {
            reject(`no results found!`);
          }
        })
      )
    })
  }
}

export default DataSearch;