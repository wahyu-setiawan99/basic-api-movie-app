import './crewmodals';

import CrewDetails from '../data/data-crews';

class CrewItem extends HTMLElement {
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
    this.innerHTML = `
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
    this.querySelector('.real-name-actor').addEventListener('click', () => {
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
