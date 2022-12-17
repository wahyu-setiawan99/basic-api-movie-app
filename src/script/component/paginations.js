class Pagination extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set pageMovie (pageMovie) {
    this._pageMovie = pageMovie;
    this.render();
  }

  get value() {
    return this.querySelector('#gotopage').value;
  }




  render() {
    this.innerHTML = `
    <div class="movie-pagination">
      <input id="gotopage" type="number" placeholder="Go to page (max 500)">
      <button id="gotopage-button" type="submit">Go!</button>
    </div>
    `;

    
    
    this.querySelector('#gotopage-button').addEventListener('click', this._pageMovie);

  }
}

customElements.define('movie-pagination', Pagination);