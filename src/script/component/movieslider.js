import './slideritem';

class MovieSlider extends HTMLElement {
  set sliders(sliders){
    this._sliders = sliders;
    this.render();
  }




  
  render(){
    this.innerHTML = `
    <div id="movieSliderCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">


        <div class="carousel-item active">
          <img src=https://image.tmdb.org/t/p/original${this._sliders[0].backdrop_path} class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h3>${this._sliders[0].title}</h3>
            <p>${this._sliders[0].overview}.</p>
          </div>
        </div>
      
      
      
        <!-- <div class="carousel-item">
          <img src=https://image.tmdb.org/t/p/original${this._sliders[1].backdrop_path} class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h3>${this._sliders[1].title}</h3>
            <p>${this._sliders[1].overview}.</p>
          </div>
        </div>
      

      
        <div class="carousel-item">
          <img src=https://image.tmdb.org/t/p/original${this._sliders[2].backdrop_path} class="d-block w-100" alt="...">
          <div class="carousel-caption d-none d-md-block">
            <h3>${this._sliders[2].title}</h3>
            <p>${this._sliders[2].overview}.</p>
          </div>
        </div> -->

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
    for (let j = 1; j<10; j++) {
      const sliderItem = document.createElement('slider-item');
      sliderItem.slider = this._sliders[j];

      carouselInner.appendChild(sliderItem);
    }

    

    const clickedTitle = document.querySelectorAll('.carousel-caption h3');
    const previewMovie = document.querySelector('movie-preview');

    for (let i=0; i<10 ; i++) {
      clickedTitle[i].addEventListener('click', ()=> {
        previewMovie.preview = this._sliders[i];



        previewMovie.scrollIntoView();

        // console.log(this._sliders[i])

      })

    }


  }
}

customElements.define('movie-slider', MovieSlider);