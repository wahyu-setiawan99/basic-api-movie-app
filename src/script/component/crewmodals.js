import moment from 'moment/moment';
import DataExtends from '../data/data-extensions';

const _ = require('lodash');

class CrewModal extends HTMLElement {
  set modal(modal) {
    [this._modal, this._movieCredits, this._detailCrew] = modal;
    this._crewPopularity = this._modal.popularity.toFixed(2);

    this._profilePict = this._modal.profile_path ? `https://image.tmdb.org/t/p/w300${this._modal.profile_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    if (!this._detailCrew.birthday) {
      this._crewAge = 'xx';
    } else if (this._detailCrew.deathday === null) {
      this._crewAge = moment(new Date()).diff(moment(this._detailCrew.birthday), 'years');
    } else {
      this._crewAge = moment(this._detailCrew.deathday).diff(moment(this._detailCrew.birthday), 'years');
    }

    this._status = this._detailCrew.deathday === null ? 'Active' : 'Passed away';

    this._placeOfBirth = this._detailCrew.place_of_birth ? this._detailCrew.place_of_birth : 'unknown';
    this.render();
  }

  renderError(message) {
    this.innerHTML = `
    <!-- Button trigger modal -->
    <button hidden id="actor_detail-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#actorsModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="actorsModal" tabindex="-1" aria-labelledby="actorsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" id="modal-close_button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <div class="no-found__notice">
              <h3>${message}</h3>
            </div>            
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  render() {
    this.innerHTML = `
    <!-- Button trigger modal -->
    <button hidden id="actor_detail-btn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#actorsModal">
      Launch demo modal
    </button>

    <!-- Modal -->
    <div class="modal fade" id="actorsModal" tabindex="-1" aria-labelledby="actorsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" id="modal-close_button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <img id="actor_image-modal" src=${this._profilePict} alt="image-actor">
            
            <div class="actor_details-modals" id="actor_name-modal">
              <h3>${this._modal.name}</h3>
            </div>

            <div class="actor_details-modals">
              ${this._crewAge} years old (${this._status}) - Born in ${this._placeOfBirth}
              
            </div>

            <div class="actor_details-modals" id="popularity_actor-modal">
              ${this._crewPopularity}
            </div>
            <div class="recent-movie_container">
              <h2>Movie Casted</h2>
              <div id="recent-movies_modal">

              </div>
              <div id="drop-down-movie__modal" class="drop-down-movie">
                <i class="fa-solid fa-circle-chevron-down"></i>
              </div>
            </div>              
          </div>


          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;

    const recentMovies = document.querySelector('#recent-movies_modal');

    const filteredMovie = this._movieCredits.filter(
      (movie) => movie.backdrop_path && movie.poster_path
      && movie.genre_ids[0] && movie.release_date,
    );
    const movieChunks = _.chunk(filteredMovie, 5);

    let noChunk = 0;
    const dropDownMovie = document.querySelector('#drop-down-movie__modal');

    const renderMovieModal = () => {
      if (movieChunks[noChunk]) {
        movieChunks[noChunk].forEach((movie) => {
          const movieItemElement = document.createElement('movie-item');

          DataExtends.getMovieDetail(movie.id)
            .then((results) => {
              const movieDetails = results[0];
              const videoKeys = results[1] === undefined ? ' ' : results[1].key;
              const listActors = results[2];

              movieItemElement.detailMovie = [movieDetails, videoKeys, listActors, movie];
            });

          recentMovies.appendChild(movieItemElement);
        });
      }
      return null;
    };

    dropDownMovie.addEventListener('click', () => {
      noChunk += 1;
      renderMovieModal();
    });

    renderMovieModal();
  }
}

customElements.define('crew-details', CrewModal);
