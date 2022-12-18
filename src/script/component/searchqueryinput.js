class QueryInput extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set search(search) {
    this._search = search;
    this.render();
  }

  get value () {
    return this.querySelector('#searchbyquery').value;
  }


  render() {
    this.innerHTML=`
    
    <div class="movie-search-query">
      <input id="searchbyquery" type="text" placeholder="Search movie ...">
      <button id="searchquery-button" type="submit">Search</button>
    </div>
    `;


    this.querySelector('#searchquery-button').addEventListener('click', this._search);

  }

}

customElements.define('query-input', QueryInput);