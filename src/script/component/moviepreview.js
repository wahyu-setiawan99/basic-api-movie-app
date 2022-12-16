const moment = require("moment/moment");

class MoviePreview extends HTMLElement {
  set preview(preview) {
    this._preview = preview;
    this.genres = preview.genre_ids.map(genre => `<span>${genre}</span>`).join('|');
    this.releaseDate = moment(preview.release_date).format('MMM Do, YYYY');
    this.render();
  }

  set detailMovie (detailMovie) {
    this._detailMovie = detailMovie[0];
    this._keyYotube = detailMovie[1];
    if (this._detailMovie.runtime > 60) {
      this.duration = moment.utc(
        moment.duration(this._detailMovie.runtime, 'minutes').asMilliseconds()
      ).format('h [hour] m [mins]');
    } else {
      this.duration = moment.utc(
        moment.duration(this._detailMovie.runtime, 'minutes').asMilliseconds()
      ).format('m [mins]');
    }
    this.render();
    
  }


  render () {
    this.innerHTML = `
      <div class="movie-details" style="background-image: url(https://image.tmdb.org/t/p/original${this._preview.backdrop_path})">
        <div class="details-wrapper">
          <ul>
            <li><h1>${this._preview.title}</h1></li>
            <li>
            <div class="vote-stars-hd">
              <div class="vote_average">
                ${this._preview.vote_average}
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
            <li><p>Genre: ${this.genres}</p></li>
            <li>
              <div class="preview_description">
                <p>${this._preview.overview}</p>
              </div>              
            </li>
            <li>
              <div class="click_movie">
                <a href=https://www.youtube.com/watch?v=${this._keyYotube} target="_blank"><i class="fa-solid fa-film"></i></a>
                <a href=https://www.google.com/search?q=streaming+${this._preview.title.replace(/[^a-zA-Z]/g, "+")}+lk21 target="_blank"><i class="fa-sharp fa-solid fa-video"></i></a>
              </div>
            </li>
            <li>
              <div class="release-duration-preview">
                <div class="released-preview">
                  Released in ${this.releaseDate}
                </div>
                <div class="duration-preview">
                  ${this.duration}
                </div>
              </div>
            </li>           
          </ul>
        </div>
      </div>

     
      `;

      const percent = ( this._preview.vote_average / 10) * 100;
      const starPercent = `${percent}%`;
      this.querySelector('.star-inner').style.width = starPercent;
  }

}

customElements.define('movie-preview', MoviePreview);