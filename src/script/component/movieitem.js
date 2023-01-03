const moment = require('moment/moment');

class MovieItem extends HTMLElement {
  constructor () {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

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
    
    this.shadowDOM.innerHTML = `    
    <style>
    /* movie item */
    :host {
      margin-bottom: 14px;
      margin-top: 4px;
      cursor: pointer;
      min-height: 320px;
    }

    .selected-movie {
      display: flex;
      flex-direction: column;
      position: relative;
      gap: 3px;
    }

    .selected-movie:hover {
      filter: brightness(80%);
    }

    .selected-movie .hd-logo, .selected-movie .rating-star-item {
      position: absolute;
      padding: 0px 2px;
      border-radius: 6px;
      color: white;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 500;
      font-size: 14px;
    }

    .selected-movie .hd-logo {
      right: 6px;
      top: 6px;
      border: 2px white solid;
    }

    .selected-movie .rating-star-item {
      left: 6px;
      top: 6px;
      background-color: black;
    }

    .selected-movie img {
      width: 100%;
      border-radius: 10px;
      height: 280px;
    }

    .selected-movie .movie-item__movie-title {
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      padding: 0 8px;  
      display: inline-block;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }

    .selected-movie .movie-item__movie-title:hover {
      color: red;
    }

    .selected-movie .year_duration_type {
      font-size: 14px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 3px;
    }

    .movie-item__year-dur-genre {
      padding: 0px 4px;
    }

    #genre-movie {
      border: 2px rgb(1, 94, 5) solid;
      border-radius: 4px;
      padding-bottom: 2px;
      margin: auto 0;
    }
    /* end of movie item */
    </style>


    <div class="selected-movie">
      <div class="hd-logo">
        HD
      </div>
      <div class="rating-star-item">        
        &#9733;${this._movieRating}        
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

    this.shadowDOM.querySelector('.selected-movie').addEventListener('click', () => {
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
