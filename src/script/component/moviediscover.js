import DataExtends from '../data/getdetailmovies';
import './movieitem';

class MovieDiscover extends HTMLElement {
  set discover (discover) {
    this._discover = discover;
    this.render();
  }

  render(){
    this.innerHTML=``;
    this._discover.forEach(movie => {
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

customElements.define('movie-discover', MovieDiscover);