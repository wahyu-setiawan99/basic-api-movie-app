const moment = require('moment/moment');

class MovieItem extends HTMLElement {
  set detailMovie(detailMovie) {
    [this._detailMovie, this._videoKeys, this._listActors, this._movie] = detailMovie;

    this._runtime = this._detailMovie.runtime;
    this._yearMovie = moment(this._movie.release_date).format('YYYY');
    this._movieRating = this._movie.vote_average.toFixed(1);
    this._movieGenre = this._movie.genre_ids[0] ? this._movie.genre_ids[0].split(' ')[0] : 'Undefined';
    this._posterPath = this._movie.poster_path ? `https://image.tmdb.org/t/p/w300${this._movie.poster_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="selected-movie">
      <div class="hd-logo">
        HD
      </div>
      <div class="rating-star-item">        
        ${this._movieRating}
        <i class="fa-sharp fa-solid fa-star"></i>
      </div>
      <img src=${this._posterPath} alt="Movie Cover">
      <div class="movie-item__movie-title">
        ${this._movie.title}
      </div>
      <div class="year_duration_type">
        <div id="year-duration" class="movie-item__year-dur-genre">
          ${this._yearMovie} &#x2022 ${this._runtime}m
        </div>
        <div id="genre-movie" class="movie-item__year-dur-genre">
          ${this._movieGenre}
        </div>
      </div>
    </div>      
  `;

    this.querySelector('.selected-movie').addEventListener('click', () => {
      const moviePreviewSection = document.querySelector('movie-preview');
      const modalHeaderBtn = document.querySelector('.modal-header button');

      moviePreviewSection.preview = [this._movie,
        this._detailMovie,
        this._videoKeys,
        this._listActors];

      setTimeout(() => {
        moviePreviewSection.scrollIntoView();

        if (modalHeaderBtn) {
          modalHeaderBtn.click();
        }
        return null;
      }, 200);
    });
  }
}

customElements.define('movie-item', MovieItem);
