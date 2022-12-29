import DataExtends from '../data/getdetailmovies';
import './movieitem';


class MovieList extends HTMLElement {
  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  renderError(message) {
    
  }

  render() {
    this.innerHTML = ``;
    this._movies.forEach(movie => {
      const movieItemElement = document.createElement('movie-item');

      DataExtends.getMovieDetail(movie.id)
      .then(results => {
        const movieDetails =  results[0].data;
        const videoKeys = results[1].data.results[0] === undefined?' ': results[1].data.results[0].key;
        const listActors = results[2].data.cast;

        movieItemElement.detailMovie = [movieDetails, videoKeys, listActors, movie];
      });
      
      this.appendChild(movieItemElement);
    });
  }
}

customElements.define('movie-list', MovieList);