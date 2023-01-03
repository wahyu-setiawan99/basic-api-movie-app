import DataExtends from '../data/data-extensions';
import './slideritem';

class MovieSlider extends HTMLElement {
  set sliders(sliders) {
    this._sliders = sliders;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div id="movieSliderCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">


        <div class="carousel-item active">
          <img src=https://image.tmdb.org/t/p/original${this._sliders[0].backdrop_path} class="d-block w-100" alt="...">
          <div class="carousel-caption ">
            <h3>${this._sliders[0].title}</h3>
            <p class="p-2 d-none d-md-block">${this._sliders[0].overview}.</p>
          </div>
        </div>

      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#movieSliderCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#movieSliderCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `;

    const carouselInner = document.querySelector('.carousel-inner');
    for (let j = 1; j < 10; j += 1) {
      const sliderItem = document.createElement('slider-item');
      sliderItem.slider = this._sliders[j];

      carouselInner.appendChild(sliderItem);
    }

    const clickedTitle = document.querySelectorAll('.carousel-caption h3');
    const previewMovie = document.querySelector('movie-preview');

    for (let i = 0; i < 10; i += 1) {
      clickedTitle[i].addEventListener('click', () => {
        DataExtends.getMovieDetail(this._sliders[i].id)
          .then((results) => {
            const movieDetails = results[0];
            const videoKeys = results[1] === undefined ? ' ' : results[1].key;
            const listActors = results[2];

            previewMovie.preview = [this._sliders[i], movieDetails, videoKeys, listActors];
          });

        setTimeout(() => {
          previewMovie.scrollIntoView();
        }, 400);
      });
    }
  }
}

customElements.define('movie-slider', MovieSlider);
