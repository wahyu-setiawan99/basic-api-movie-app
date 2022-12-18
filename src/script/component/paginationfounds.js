class PageFounds extends HTMLElement {
  connectedCallback (){
    this.render();
  }
  
  get value () {
    return document.querySelector('#display_input-page').value;
  }

  render(){
    this.innerHTML = `
    <div id="display-current_page-founds">Current page: <span id="current_page-founds">1</span></div>
    <div class="founds-pagination">
      <button id="previous-button-founds">&laquo;</button>
      <input value="1" type="number" id="display_input-page" min="1"></input>
      <button id="next-button-founds">&raquo;</button>
      <button id="gotopage-founds" type="submit">Go!</button>
    </div>
    `;


    const sectionContainer = document.querySelector('.section-container');
    const prevPageBtn = document.querySelector('#previous-button-founds');
    const nextPageBtn = document.querySelector('#next-button-founds');
    const gotopageFound = document.querySelector('#gotopage-founds')
    const displayInputPage = document.querySelector('#display_input-page');
    const currentPage = document.querySelector('#current_page-founds');

    let count = 1;

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

customElements.define('pagination-founds', PageFounds);