import DataExtends from '../data/data-extensions';
import './movieitem';

class DiscoverList extends HTMLElement {
  set discover(discover) {
    this._discover = discover;
    this.render();
  }

  renderError(message) {
    this.innerHTML = '';
    this.innerHTML += `
    <div class="no-found__notice">
      <h3>${message}</h3>
    </div>
  `;
  }

  render() {
    this.innerHTML = '';
    this._discover.forEach((movie) => {
      const movieItemElement = document.createElement('movie-item');

      DataExtends.getMovieDetail(movie.id)
        .then((results) => {
          const movieDetails = results[0];
          const videoKeys = results[1] === undefined ? ' ' : results[1].key;
          const listActors = results[2];

          movieItemElement.detailMovie = [movieDetails, videoKeys, listActors, movie];
        })
        .catch((messsage) => {
          console.log(messsage);
        });

      this.appendChild(movieItemElement);
    });
  }
}

customElements.define('discover-list', DiscoverList);
