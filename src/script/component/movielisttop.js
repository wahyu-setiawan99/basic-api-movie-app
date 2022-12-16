import DataExtends from './getdetailmovies';
import './movieitem';


class TopMovieList extends HTMLElement {
  set topmovies(topmovies) {
    this._topmovies = topmovies;
    this.render();
  }

  

  render() {
    this.innerHTML = ``;
    const filteredMovie = this._topmovies.filter(movie => movie.backdrop_path);
    filteredMovie.forEach(async(topmovie) => {
      const topItemElement = document.createElement('movie-item');
      topItemElement.movie = topmovie;

      DataExtends.getMovieDetail(topmovie.id)
      .then(results => {
        const movieDetails =  results[0].data;
        const videoKeys = results[1].data.results[0] === undefined?' ': results[1].data.results[0].key;
        const listActors = results[2].data.cast;

        topItemElement.detailMovie = [movieDetails, videoKeys, listActors];
      });    
      
      this.appendChild(topItemElement);
    });
  }


}

customElements.define('top-list', TopMovieList);