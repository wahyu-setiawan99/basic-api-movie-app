class SliderItem extends HTMLElement {
  set slider(slider) {
    this._slider = slider;
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="carousel-item">
      <img src=https://image.tmdb.org/t/p/original${this._slider.backdrop_path} class="d-block w-100" alt="...">
      <div class="carousel-caption">
        <h3>${this._slider.title}</h3>
        <p class="p-2 d-none d-md-block">${this._slider.overview}.</p>
      </div>
    </div>
    `;
  }
}

customElements.define('slider-item', SliderItem);
