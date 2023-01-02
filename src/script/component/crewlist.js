import './crewitem';

class MovieCrews extends HTMLElement {
  set crews(crews) {
    this._crews = crews;
    this.render();
  }

  render() {
    this.innerHTML = `
    <h2>Movie Cast</h2>
      <div class="movie-crews">

      </div>
    `;
    for (let i = 0; i < 10; i += 1) {
      const crewItemElement = document.createElement('crew-item');
      const movieCrews = document.querySelector('.movie-crews');

      if (this._crews[i] !== undefined) {
        crewItemElement.crew = this._crews[i];
      }

      movieCrews.appendChild(crewItemElement);
    }

    const closeButton = document.querySelector('.btn-close');
    closeButton.addEventListener('click', () => {
      this.innerHTML = '';
    });
  }
}

customElements.define('movie-crews', MovieCrews);
