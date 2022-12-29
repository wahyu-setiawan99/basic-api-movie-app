import DataExtends from '../data/getdetailmovies';
import './movieitem';


class TopMovieList extends HTMLElement {
  set topmovies(topmovies) {
    this._topmovies = topmovies;
    this.render();
  }

  render() {
    this.innerHTML = ``;
    this._topmovies.forEach(topmovie => {
      const topItemElement = document.createElement('movie-item');


      DataExtends.getMovieDetail(topmovie.id)
      .then(results => {
        const movieDetails =  results[0].data;
        const videoKeys = results[1].data.results[0] === undefined?' ': results[1].data.results[0].key;
        const listActors = results[2].data.cast;

        topItemElement.detailMovie = [movieDetails, videoKeys, listActors, topmovie];
      });    
      
      this.appendChild(topItemElement);
    });
  }


}

customElements.define('top-list', TopMovieList);