import './crewmodals';
import CrewDetails from '../data/data-crews';

class CrewItem extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set crew(crew) {
    this._crew = crew;
    if (crew.profile_path === null) {
      this.actor_image = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    } else {
      this.actor_image = `https://image.tmdb.org/t/p/w300${crew.profile_path}`;
    }

    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
      /* crew-item element*/
      :host {
        max-height: 500px;
        text-align: center;
        display: flex;
        flex-direction: column;
      }

      .actor-pictures img {
        height: 250px;
        max-width: 170px;
        border-radius: 6px;
      }

      .real-name-actor, .character-name {
        padding: 4px 6px;
        margin-top: 4px;
      }

      .real-name-actor {
        font-weight: 500;
        cursor: pointer;
      }

      .real-name-actor:hover {
        color: red;
      }

      .real-name-actor, .character-name{
        margin: 0 auto;
        max-width: 160px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
      }

    @media only screen and (max-width: 740px) {
      .actor-pictures img {
        height: 200px;
        max-width: 120px;
      }

      .real-name-actor, .character-name{
        max-width: 120px;
      }
    }

      /* end of crew-item element */

      </style>

      <div class="actor-pictures">
        <img src=${this.actor_image} alt="actors-pict">
      </div>      
      <div class="real-name-actor">
        ${this._crew.name}
      </div>
      <div class="character-name">
        ${this._crew.character}
      </div>
    `;

    const crewModal = document.querySelector('crew-details');
    this.shadowDOM.querySelector('.real-name-actor').addEventListener('click', () => {
      CrewDetails.searchCrews(this._crew.id)
        .then((results) => {
          const detailCrew = results[1];
          const getGenreModal = () => results[2].map((movie) => ({
            ...movie,
            genre_ids: movie.genre_ids.map((number) => results[0].find(
              (genreCode) => genreCode.id === number,
            ).name),
          }));

          const movieModals = getGenreModal();
          crewModal.modal = [this._crew, movieModals, detailCrew];
          document.querySelector('#actor_detail-btn').click();
        })

        .catch((message) => {
          crewModal.renderError(message);
        });
    });
  }
}

customElements.define('crew-item', CrewItem);
