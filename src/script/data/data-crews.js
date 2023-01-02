import axios from 'axios';

class CrewDetails {
  static searchCrews(personId) {
    const baseUrl = 'https://api.themoviedb.org/3';
    const apiKey = '2549c839db5e074878d2577ca548bc87';

    return new Promise((resolve, reject) => {
      const requestGenre = axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
      const detailCrew = axios.get(`${baseUrl}/person/${personId}?api_key=${apiKey}`);
      const crewMovies = axios.get(`${baseUrl}/person/${personId}/movie_credits?api_key=${apiKey}`);

      axios.all([requestGenre, detailCrew, crewMovies])
        .then(
          axios.spread((...responseJson) => {
            const responseGenre = responseJson[0].data.genres;
            const responseDetailCrew = responseJson[1].data;
            const responseCrewMovies = responseJson[2].data.cast;

            if (responseDetailCrew) {
              resolve([responseGenre, responseDetailCrew, responseCrewMovies]);
            } else {
              reject(new Error('No record founds'));
            }
          }),
        );
    });
  }
}

export default CrewDetails;
