import './crewmodals';

import CrewDetails from '../data/getcrewdetails';

class CrewItem extends HTMLElement {
  set crew(crew){
    this._crew = crew;
    if (crew.profile_path === null) {
      this.actor_image = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`
    } else {
      this.actor_image = `https://image.tmdb.org/t/p/w300${crew.profile_path}`;
    }
    
    this.render()
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

    this.querySelector('.real-name-actor').addEventListener('click', () => {
      CrewDetails.searchCrews(this._crew.id)
        .then(results => {
          const detailCrew = results[2];

          const crewModal = document.querySelector('crew-details');

          const getGenreModal = () => {
            return results[0].map(movie => {
              return {
                ...movie, genre_ids: movie.genre_ids.map(number => results[1].find(genreCode => genreCode.id === number).name)
              }
            });            
          }

          const movieModals = getGenreModal();

          crewModal.modal = [this._crew, movieModals, detailCrew];
          ;


          document.querySelector('#actor_detail-btn').click();          

        })
        
        .catch(e => console.log(e));
      
    })
  }

}

customElements.define('crew-item', CrewItem);