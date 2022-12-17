import './movieitem';
import DataExtends from './getdetailmovies';

class MovieList extends HTMLElement {
  set movies(movies) {
    this._movies = movies;
    this.render();
  }

  set genres(genres) {
    this._genres = genres;
    this.render();
  }

  renderError(message) {
    
  }

  


  render() {
    this.innerHTML = ``;
    const filteredMovie = this._movies.filter(movie => movie.backdrop_path);
    filteredMovie.forEach((movie) => {
      const movieItemElement = document.createElement('movie-item');

      //masih bisa dipersingkat, sama dengan toplistmovies
      movieItemElement.movie = movie;

      DataExtends.getMovieDetail(movie.id)
      .then(results => {
        const movieDetails =  results[0].data;
        const videoKeys = results[1].data.results[0] === undefined?' ': results[1].data.results[0].key;
        const listActors = results[2].data.cast;


        movieItemElement.detailMovie = [movieDetails, videoKeys, listActors];
      });
      
      this.appendChild(movieItemElement);
    });
  }
}

customElements.define('movie-list', MovieList);