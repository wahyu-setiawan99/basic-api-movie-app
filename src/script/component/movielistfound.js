import DataExtends from '../data/getdetailmovies';
import './movieitem';

class MovieFound extends HTMLElement {
  set founds (founds) {
    this._founds = founds;
    this.render();
  }

  renderError(message) {
    this.innerHTML = ``;
    this.innerHTML += `<h3>${message}</h3>`;
  }

  render() {
    this.innerHTML = ``;
    const filteredMovie = this._founds.filter(movie => movie.backdrop_path && movie.poster_path && movie.genre_ids[0]);
    filteredMovie.forEach(found => {
      const movieItemElement = document.createElement
      ('movie-item');

      movieItemElement.movie = found;

      DataExtends.getMovieDetail(found.id)
      .then(results => {
        const movieDetails =  results[0].data;
        const videoKeys = results[1].data.results[0] === undefined?' ': results[1].data.results[0].key;
        const listActors = results[2].data.cast;

        movieItemElement.detailMovie = [movieDetails, videoKeys, listActors]
        
      });
      
      this.appendChild(movieItemElement);
      
    });
  }

}

customElements.define('found-list', MovieFound);