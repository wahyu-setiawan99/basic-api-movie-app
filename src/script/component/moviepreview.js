const moment = require('moment/moment');
const { default: DataExtends } = require('../data/data-extensions');

class MoviePreview extends HTMLElement {
  set preview(preview) {
    [this._preview, this._detailMovie, this._keyYotube, this._actorsPreview] = preview;

    this._backgroundImg = this._preview.backdrop_path ? `https://image.tmdb.org/t/p/original${this._preview.backdrop_path}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
    this._ratingVote = this._preview.vote_average.toFixed(1);
    this._genres = this._preview.genre_ids.map((genre) => `<span>${genre}</span>`).join('|');
    this._releaseDate = moment(this._preview.release_date).format('MMM Do, YYYY');

    if (this._detailMovie.runtime > 60) {
      this._duration = moment.utc(
        moment.duration(this._detailMovie.runtime, 'minutes').asMilliseconds(),
      ).format('h [hour] m [mins]');
    } else {
      this._duration = moment.utc(
        moment.duration(this._detailMovie.runtime, 'minutes').asMilliseconds(),
      ).format('m [mins]');
    }

    this._firstLanguage = this._detailMovie.spoken_languages[0] ? this._detailMovie.spoken_languages[0].english_name : 'unavailable';

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="movie-details" style="background-image: url(${this._backgroundImg})">
        <button type="button" class="btn-close btn-close-dark" aria-label="Close"></button>
        <div class="details-wrapper">
          <ul>
            <li><h1>${this._preview.title}</h1></li>
            <li>
            <div class="vote-stars-hd">
              <div class="vote_average">
                ${this._ratingVote}
              </div>
              <div class="stars-rated">
                <div class="star-outer">
                  <div class="star-inner">
                  </div>
                </div>
              </div>
              <div>
                (${this._preview.vote_count} vote)
              </div>
              <div class="hd-logo">
                <p>HD</p>
              </div>
            </div>

            </li>
            <li><p id="genre-preview">Genre : ${this._genres}</p></li>
            <li>
              <div class="preview_description">
                <p>${this._preview.overview}</p>
              </div>              
            </li>
            <li>
              <div class="click_movie">
                <a href=https://www.youtube.com/watch?v=${this._keyYotube} target="_blank"><i class="fa-solid fa-film"></i></a>
                <a href=https://www.google.com/search?q=streaming+${this._preview.title.replace(/[^a-zA-Z]/g, '+')}+lk21 target="_blank"><i class="fa-sharp fa-solid fa-video"></i></a>
              </div>
            </li>
            <li>
              <div class="release-duration-preview">
                <div id="language-preview">
                  ${this._firstLanguage}
                </div>
                <div id="released-preview">
                  Released in ${this._releaseDate}
                </div>
                <div id="duration-preview">
                  ${this._duration}
                </div>
              </div>
            </li>           
          </ul>
        </div>
      </div>     
      `;

    const percent = (this._preview.vote_average / 10) * 100;
    const starPercent = `${percent}%`;
    this.querySelector('.star-inner').style.width = starPercent;

    const listCrews = document.querySelector('movie-crews');
    listCrews.crews = this._actorsPreview;

    const relatedMoviesPart = document.querySelector('related-movie');

    DataExtends.getRelatedMovies(this._preview.id)
      .then((results) => {
        const similarMovies = results[0];
        relatedMoviesPart.related = similarMovies;
      });

    const closeButton = document.querySelector('.btn-close');
    closeButton.addEventListener('click', () => {
      this.innerHTML = '';
      const sectionContainer = document.querySelector('.section-container');

      setTimeout(() => {
        sectionContainer.scrollIntoView();
      }, 100);
    });
  }
}

customElements.define('movie-preview', MoviePreview);
