const moment = require("moment/moment");

class MovieItem extends HTMLElement {
  set movie(movie) {
    this._movie = movie;
    this.yearMovie = moment(movie.release_date).format('YYYY');
    this.render();
  }

  set detailMovie(detailMovie) {
    this._detailMovie = detailMovie[0];
    this._videoKeys = detailMovie[1];
    this._listActors = detailMovie[2];
    this.runtime = this._detailMovie.runtime;
    this.render();
  }
  

  render() {
    this.innerHTML = `
    <div class="selected-movie">
      <div class="hd-logo">
        HD
      </div>
      <div class="rating-star-item">        
        ${this._movie.vote_average}
        <i class="fa-sharp fa-solid fa-star"></i>
      </div>
      <img src=https://image.tmdb.org/t/p/w300${this._movie.poster_path} alt="Movie Cover">
      <div class="movie-item__movie-title">
        ${this._movie.title}
      </div>
      <div class="year_duration_type">
        <div id="year-duration" class="movie-item__year-dur-genre">
          ${this.yearMovie} &#x2022 ${this.runtime}m
        </div>
        <div id="genre-movie" class="movie-item__year-dur-genre">
          ${this._movie.genre_ids[0].split(' ')[0]}
        </div>
      </div>
    </div>      
  `;

  this.querySelector('.selected-movie').addEventListener('click', () => {
    const moviePreviewSection = document.querySelector('movie-preview');
    

    moviePreviewSection.preview = [this._movie, this._detailMovie, this._videoKeys, this._listActors];

    setTimeout(() => {
      moviePreviewSection.scrollIntoView();
    }, 200);


    



  });


  }

}

customElements.define('movie-item', MovieItem);
