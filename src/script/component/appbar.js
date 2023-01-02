class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="">
          <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhsh8e00N8wcKRWTfuydUvDy_NfoyrFV6y7EuJWFQ8608qNi4LrF1rbPCeDzRfgtzUYctT_pRuJoIDtr2fr4SOZg4Wh4Glv50vM8wOAyIJTdVEK6W8F8DJ2-P314jJXrnJtk-8j_rx3CG6HPCZBV73G5qsLEGpeVc5S3seR61gRzCujloqb-IJGPAA_/s16000/movie-maniac-ori.png" alt="movie-maniac-logo" width="200" height="70">
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse  justify-content-center" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item ms-lg-5">
              <a class="nav-link text-light" aria-current="page" href="">
                <i class="fa-solid fa-house"></i>
                HOME
              </a>
            </li>
            <li id="most-popular-movies" class="nav-item ms-lg-5">
              <a class="nav-link text-light" href="#discover-tab">
                <i class="fa-solid fa-film"></i>
                MOST POPULAR
              </a>
            </li>
            <li id="most-favorite-movies" class="nav-item ms-lg-5">
              <a class="nav-link text-light" href="#favorite-tab">
                <i class="fa-solid fa-star"></i>
                FAVORITE
              </a>
            </li>
            <li id="search-more-movies" class="nav-item ms-lg-5">
              <a class="nav-link text-light" href="#found-tab">
                <i class="fa-solid fa-circle-info"></i>
                MORE
              </a>
            </li>
          </ul>
        </div>


        <div class="collapse navbar-collapse  justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li id="creating-account-movies" class="nav-item">
              <a class="nav-link text-light" href="https://www.themoviedb.org/signup" target=”_blank”>
                <i class="fa-solid fa-user"></i>
                ACCOUNT
              </a>
            </li>
          </ul>
        </div>


      </div>
    </nav>
  `;

    this.querySelector('#most-popular-movies').addEventListener('click', () => {
      document.querySelector('#discover-tab').click();
      document.querySelector('#reset_button-discover').click();
    });

    this.querySelector('#most-favorite-movies').addEventListener('click', () => {
      document.querySelector('#favorite-tab').click();
      document.querySelector('#first_page-button-favorite').click();
    });

    this.querySelector('#search-more-movies').addEventListener('click', () => {
      document.querySelector('#found-tab').click();
      document.querySelector('#deletequery-button').click();
    });
  }
}

customElements.define('app-bar', AppBar);
