import DataExtends from '../data/data-extensions';
import './movieitem';

class MovieFound extends HTMLElement {
  set founds(founds) {
    this._founds = founds;
    this.render();
  }

  renderError(message) {
    this.innerHTML = '';
    this.innerHTML = `
    <div class="no-found__notice">
      <h3>${message}</h3>
    </div>    
    `;
  }

  render() {
    this.innerHTML = '';
    this._founds.forEach((found) => {
      const movieItemElement = document.createElement('movie-item');

      DataExtends.getMovieDetail(found.id)
        .then((results) => {
          const movieDetails = results[0];
          const videoKeys = results[1] === undefined ? ' ' : results[1].key;
          const listActors = results[2];

          movieItemElement.detailMovie = [movieDetails, videoKeys, listActors, found];
        });

      this.appendChild(movieItemElement);
    });
  }
}

customElements.define('found-list', MovieFound);
