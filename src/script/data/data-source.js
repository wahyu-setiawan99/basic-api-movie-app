import axios from 'axios';

class DataSource {
  static searchMovie() {
    const baseUrl = 'https://api.themoviedb.org/3';
    const api_key = '2549c839db5e074878d2577ca548bc87';

    return new Promise ((resolve) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${api_key}`);

      const requestCountry = axios.get(`${baseUrl}/configuration/languages?api_key=${api_key}`);

      const requestWeeklyTrend = axios.get(`${baseUrl}/trending/movie/day?api_key=${api_key}`);
      
      axios.all([
        requestGenre,
        requestCountry,
        requestWeeklyTrend,      
      ]).
        then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;
            const responseCountry = responseJson[1].data;
            const responseWeekTrend = responseJson[2].data.results;
        resolve([
          responseGenre,
          responseCountry,
          responseWeekTrend,
        ]);
      }))
    })
  }


  static discoveryMovie(page, sort, year, genre, minVote, lang='') {
    const baseUrl = 'https://api.themoviedb.org/3';
    const api_key = '2549c839db5e074878d2577ca548bc87';

    return new Promise ((resolve) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${api_key}`);

      const requestDiscover = axios.get(`${baseUrl}/discover/movie?api_key=${api_key}&sort_by=${sort}&vote_average.gte=${minVote}&page=${page}&primary_release_year=${year}&with_genres=${genre}&with_original_language=${lang}`);
  
      axios.all([
        requestGenre,
        requestDiscover
      ]).
        then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;
            const responseDiscover = responseJson[1].data.results;

        resolve([
          responseGenre,
          responseDiscover
      
        ]);
      }))
    })    
  }


  static favoriteMovie(page) {
    const baseUrl = 'https://api.themoviedb.org/3';
    const api_key = '2549c839db5e074878d2577ca548bc87';

    return new Promise ((resolve) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${api_key}`);
      
      const requestFavorite = axios.get(`${baseUrl}/movie/top_rated?api_key=${api_key}&page=${page}`);
      
      axios.all([
        requestGenre,
        requestFavorite        
      ]).
        then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;
            const responseTopRated = responseJson[1].data.results;
        resolve([
          responseGenre,
          responseTopRated
        ]);
      }))
    })
  }


  static getGenreList() {
    const baseUrl = 'https://api.themoviedb.org/3';
    const api_key = '2549c839db5e074878d2577ca548bc87';

    return new Promise ((resolve) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${api_key}`);
  
      axios.all([
        requestGenre,
      ]).
        then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;

        resolve([
          responseGenre,
        
        ]);
      }))
    })    
  }

}

export default DataSource;