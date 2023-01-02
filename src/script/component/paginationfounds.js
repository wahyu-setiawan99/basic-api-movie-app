class PageFounds extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  get value() {
    const inputPage = this.querySelector('#display_input-page').value;
    if (inputPage < 501) {
      return inputPage;
    }
    return 500;
  }

  render() {
    this.innerHTML = `
    <div class="display-current_page-movies">Current page: <span id="current_page-founds">1</span></div>
    <div class="movie-pagination">
      <button id="first_page-button-founds">1st page</button>
      <button id="previous-button-founds">&laquo;</button>

      <input value="1" type="number" id="display_input-page" min="1"></input>

      <button id="next-button-founds">&raquo;</button>
      <button id="gotopage-founds" type="submit">Go!</button>
    </div>
    `;

    const sectionContainer = document.querySelector('.section-container');
    const firstPageBtn = document.querySelector('#first_page-button-founds');
    const prevPageBtn = document.querySelector('#previous-button-founds');
    const nextPageBtn = document.querySelector('#next-button-founds');
    const gotopageFound = document.querySelector('#gotopage-founds');
    const displayInputPage = document.querySelector('#display_input-page');
    const currentPage = document.querySelector('#current_page-founds');

    let count = 1;

    firstPageBtn.addEventListener('click', () => {
      count = 1;
      displayInputPage.value = count;
      currentPage.innerText = count;
      this.clickEvent();
    });

    prevPageBtn.addEventListener('click', () => {
      if (count > 1) {
        count -= 1;
      } else {
        count = 1;
      }
      displayInputPage.value = count;
      currentPage.innerText = count;
      this.clickEvent();
    });

    nextPageBtn.addEventListener('click', () => {
      if (count < 500) {
        count = parseInt(count, 10) + 1;
      } else {
        count = parseInt(count, 10);
      }

      displayInputPage.value = count;
      currentPage.innerText = count;
      this.clickEvent();

      setTimeout(() => {
        sectionContainer.scrollIntoView();
      }, 100);
    });

    gotopageFound.addEventListener('click', () => {
      if (displayInputPage.value < 1) {
        count = 1;
      } else if (displayInputPage.value > 500) {
        count = 500;
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
