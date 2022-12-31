class Pagination extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  get value() {
    return this.querySelector('#display_input-movies').value;
  }


  render() {
    this.innerHTML = `
    <div class="display-current_page-movies">Current page: <span id="current_page-movies">1</span></div>
    <div class="movie-pagination">
      <button id="first_page-button-movies">1st page</button>
      <button id="previous-button-movies">&laquo;</button>
      <input id="display_input-movies" type="number" value="1" min="1">
      <button id="next-button-movies">&raquo;</button>
      <button id="gotopage-movies" type="submit">Go!</button>
    </div>
    `;

    const sectionContainer = document.querySelector('.section-container');
    const firstPageBtn = document.querySelector('#first_page-button-movies');
    const prevPageBtn = document.querySelector('#previous-button-movies');
    const nextPageBtn = document.querySelector('#next-button-movies');
    const gotopageMovies = document.querySelector('#gotopage-movies')
    const displayInputPage = document.querySelector('#display_input-movies');
    const currentPage = document.querySelector('#current_page-movies');


    let count = 1;

    firstPageBtn.addEventListener('click', ()=> {
      count = 1;
      displayInputPage.value = count;
      currentPage.innerText = count;
      this.clickEvent();
    })

    prevPageBtn.addEventListener('click', ()=> {
      if (count > 1) {
        count = count - 1;
      } else {
        count = 1
      }
      displayInputPage.value = count;
      currentPage.innerText = count;
      this.clickEvent();
    });

    nextPageBtn.addEventListener('click', ()=> {
      count = parseInt(count) + 1;

      displayInputPage.value = count;
      currentPage.innerText = count;
      this.clickEvent();

      
        
        setTimeout(() => {
          sectionContainer.scrollIntoView();          
        }, 100);

    });

    gotopageMovies.addEventListener('click', ()=> {
      if (displayInputPage.value < 1) {
        count = 1;
      } else {
        count = displayInputPage.value;
      }
      
      currentPage.innerText = count;

      this.clickEvent();
        
        setTimeout(() => {
          sectionContainer.scrollIntoView();          
        }, 100);
    });

  }
}

customElements.define('movie-pagination', Pagination);