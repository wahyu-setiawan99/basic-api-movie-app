class PaginationFav extends HTMLElement {
  connectedCallback (){
    this.render();
  }
  
  get value () {
    return document.querySelector('#display_input-favorite').value;
  }

  render(){
    this.innerHTML = `
    <div class="display-current_page-movies">Current page: <span id="current_page-favorite">1</span></div>
    <div class="movie-pagination">
      <button id="first_page-button-favorite">1st page</button>
      <button id="previous-button-favorite">&laquo;</button>

      <input value="1" type="number" id="display_input-favorite" min="1"></input>
      
      <button id="next-button-favorite">&raquo;</button>
      <button id="gotopage-favorite" type="submit">Go!</button>
    </div>
    `;


    const sectionContainer = document.querySelector('.section-container');
    const firstPageBtn = document.querySelector('#first_page-button-favorite');
    const prevPageBtn = document.querySelector('#previous-button-favorite');
    const nextPageBtn = document.querySelector('#next-button-favorite');
    const gotopageFound = document.querySelector('#gotopage-favorite')
    const displayInputPage = document.querySelector('#display_input-favorite');
    const currentPage = document.querySelector('#current_page-favorite');

    let count = 1;    

    firstPageBtn.addEventListener('click', ()=> {
      count = 1;
      displayInputPage.value = count;
      currentPage.innerText = count;
      this.clickEvent();
    });




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





    gotopageFound.addEventListener('click', ()=> {
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

customElements.define('favorite-pagination', PaginationFav);