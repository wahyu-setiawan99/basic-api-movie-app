import axios from 'axios';

class DataExtends {
  static getMovieDetail(movie_id) {
    return new Promise ((resolve, reject) => {

      const baseUrl = `https://api.themoviedb.org/3`;
      const api_key = `2549c839db5e074878d2577ca548bc87`;
      const movieDetail = axios.get(`${baseUrl}/movie/${movie_id}?api_key=${api_key}`);
  
      const getMovieVideos = axios.get(`${baseUrl}/movie/${movie_id}/videos?api_key=${api_key}`);
  
      const getCredits = axios.get(`${baseUrl}/movie/${movie_id}/credits?api_key=${api_key}`);
  
      axios.all([movieDetail, getMovieVideos, getCredits]).
      then(
        axios.spread((...responseJson) => {
          const responseMovieDetails = responseJson[0];
          const responseGetMovieVideos = responseJson[1];
          const responseGetCredits = responseJson[2];
  
          if (responseGetMovieVideos||responseMovieDetails){
            resolve([
              responseMovieDetails,
              responseGetMovieVideos,
              responseGetCredits
            ]);
          } else {
            reject(e => {
              console.log(e);
            })
          } 
        })
      )
    })
  }

}


export default DataExtends;