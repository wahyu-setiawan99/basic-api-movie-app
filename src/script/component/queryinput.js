class QueryInput extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set search(search) {
    this._search = search;
    this.render();
  }

  get value() {
    const keyword = this.querySelector('#searchbyquery').value;

    if (keyword.length > 0) {
      return keyword;
    }
    return 'keyword-meant-not-t-be-found-12345';
  }

  render() {
    this.innerHTML = `
    
    <div class="movie-search-query">
      <input id="searchbyquery" type="text" placeholder="Search movie ...">
      <button id="deletequery-button"><i class="fa-solid fa-xmark"></i></button>
      <button id="searchquery-button" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    `;

    this.querySelector('#searchquery-button').addEventListener('click', () => {
      document.querySelector('#first_page-button-founds').click();
    });

    this.querySelector('#deletequery-button').addEventListener('click', () => {
      this.querySelector('#searchbyquery').value = '';
    });
  }
}

customElements.define('query-input', QueryInput);
