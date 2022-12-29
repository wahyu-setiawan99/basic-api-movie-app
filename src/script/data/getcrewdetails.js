import axios from "axios";

class CrewDetails {
  static searchCrews(person_id) {
    const baseUrl = `https://api.themoviedb.org/3`;
    const api_key = `2549c839db5e074878d2577ca548bc87`;

    return new Promise ((resolve, reject) => {
      const crewMovies = axios.get(`${baseUrl}/person/${person_id}/movie_credits?api_key=${api_key}`);
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${api_key}`);
      const detailCrew = axios.get(`${baseUrl}/person/${person_id}?api_key=${api_key}`)



      axios.all([crewMovies, requestGenre, detailCrew])
      .then(
        axios.spread((...responseJson) => {
          
          const responseCrewMovies = responseJson[0].data.cast;
          const responseGenre = responseJson[1].data.genres;
          const responseDetailCrew = responseJson[2].data

          if (responseCrewMovies[0]) {
            resolve([responseCrewMovies, responseGenre, responseDetailCrew]);
          } else {
            reject('no record of the actor');
          }
        })
      )
    })
  }
}

export default CrewDetails;