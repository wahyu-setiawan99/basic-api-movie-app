import DataExtends from '../data/data-extensions';
import './movieitem';

class FavoriteList extends HTMLElement {
  set favorite(favorite) {
    this._favorite = favorite;
    this.render();
  }

  render() {
    this.innerHTML = '';
    this._favorite.forEach((topmovie) => {
      const topItemElement = document.createElement('movie-item');

      DataExtends.getMovieDetail(topmovie.id)
        .then((results) => {
          const movieDetails = results[0];
          const videoKeys = results[1] === undefined ? ' ' : results[1].key;
          const listActors = results[2];

          topItemElement.detailMovie = [movieDetails, videoKeys, listActors, topmovie];
        });

      this.appendChild(topItemElement);
    });
  }
}

customElements.define('favorite-list', FavoriteList);
