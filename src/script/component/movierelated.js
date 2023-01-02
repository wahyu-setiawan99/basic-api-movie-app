import DataSource from '../data/data-source';
import DataExtends from '../data/data-extensions';
import './movieitem';

const _ = require('lodash');

class RelatedMovie extends HTMLElement {
  set related(related) {
    this._related = related;
    this.render();
  }

  render() {
    this.innerHTML = `
    <h2>Related Movie</h2>
      <div class="related-movies">

      </div>
      <div id="drop-down-movie__related" class="drop-down-movie">
        <i class="fa-solid fa-circle-chevron-down"></i>
      </div>
    `;

    const relatedMoviesChunck = _.chunk(this._related, 8);

    const relatedMoviesWrapper = document.querySelector('.related-movies');

    const closeButton = document.querySelector('.btn-close');
    closeButton.addEventListener('click', () => {
      this.innerHTML = '';
    });

    let chunkNo = 0;

    const renderRelated = () => {
      if (relatedMoviesChunck[chunkNo]) {
        DataSource.getBasicData()
          .then((genres) => {
            const getMovieGenres = () => relatedMoviesChunck[chunkNo].map((movie) => ({
              ...movie,
              genre_ids: movie.genre_ids.map(
                (number) => genres[0].find((genreCode) => genreCode.id === number).name,
              ),
            }));

            const completeMovies = getMovieGenres();

            for (let i = 0; i < relatedMoviesChunck[chunkNo].length; i += 1) {
              const movieItemElement = document.createElement('movie-item');

              DataExtends.getMovieDetail(relatedMoviesChunck[chunkNo][i].id)
                .then((results) => {
                  const movieDetails = results[0];
                  const videoKeys = results[1] === undefined ? ' ' : results[1].key;
                  const listActors = results[2];

                  movieItemElement.detailMovie = [
                    movieDetails,
                    videoKeys,
                    listActors,
                    completeMovies[i]];

                  relatedMoviesWrapper.appendChild(movieItemElement);
                });
            }
          });
      }
      return null;
    };

    renderRelated();

    const dropRelatedBtn = document.querySelector('#drop-down-movie__related');
    dropRelatedBtn.addEventListener('click', () => {
      chunkNo += 1;
      renderRelated();
    });
  }
}

customElements.define('related-movie', RelatedMovie);
