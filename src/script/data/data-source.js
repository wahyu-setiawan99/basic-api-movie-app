import axios from 'axios';

class DataSource {
  static searchMovie(page) {
    const baseUrl = 'https://api.themoviedb.org/3';
    const api_key = '2549c839db5e074878d2577ca548bc87';

    return new Promise ((resolve) => {
      const requestPopular = axios.get(`${baseUrl}/movie/popular?api_key=${api_key}&page=${page} `);
      const requestTopRated = axios.get(`${baseUrl}/movie/top_rated?api_key=${api_key}&page=1`);
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${api_key}`);
      const requestWeeklyTrend = axios.get(`${baseUrl}/trending/movie/day?api_key=${api_key}`);
  
      axios.all([
        requestPopular,
        requestTopRated,
        requestGenre,
        requestWeeklyTrend
      ]).
        then(
          axios.spread((...responseJson) => {
            const responsePopular = responseJson[0].data.results;
            const responseTopRated = responseJson[1].data.results;
            const responseGenre = responseJson[2].data.genres;
            const responseWeekTrend = responseJson[3].data.results;
        

        resolve([
          responsePopular,
          responseTopRated,
          responseGenre,
          responseWeekTrend
          
        ]);
      }))
    })
  }
}

export default DataSource;