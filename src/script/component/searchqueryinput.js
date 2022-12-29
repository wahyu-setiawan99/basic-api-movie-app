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
      <button id="deletequery-button"><i class="fa-solid fa-xmark"></i></button>
      <button id="searchquery-button" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>
    `;


    this.querySelector('#searchquery-button').addEventListener('click', this._search);

    this.querySelector('#deletequery-button').addEventListener('click', ()=> {
      this.querySelector('#searchbyquery').value = '';
    })

  }

}

customElements.define('query-input', QueryInput);