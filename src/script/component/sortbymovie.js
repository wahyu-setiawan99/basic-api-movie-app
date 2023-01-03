class SortByMovie extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  get option() {
    return this.querySelector('#sort-movie').value;
  }

  get yearMovie() {
    return this.querySelector('#year-movie').value;
  }

  get genreDiscovery() {
    return this.querySelector('#genre-discover').value;
  }

  get minVoteDiscovery() {
    return this.querySelector('#min_vote-discover').value;
  }

  get countryCode() {
    return this.querySelector('#select-country_input').value;
  }

  render() {
    this.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid" id="sort-discover_movie">
        <button class="navbar-toggler mx-auto mb-2 text-white px-5 py-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSortMovie" aria-controls="navbarSortMovie" aria-expanded="false" aria-label="Toggle navigation">
          Filter Movie
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-start" id="navbarSortMovie">
          <ul class="navbar-nav">
            <li class="nav-item me-lg-4 mb-3">
              <div class="sort-feature">
                <label for="sort-movie">Sort by:</label>
                <select name="sort-movie" id="sort-movie" >
                  <option value="popularity.desc">Popularity</option>
                  <option value="vote_count.desc">Vote count</option>
                  <option value="release_date.desc">Release date</option>
                  <option value="vote_average.desc">Rating</option>
                  <option value="original_title.desc">Title</option>
                </select>
              </div>              
            </li>
            <li class="nav-item me-lg-4 mb-3">
              <div class="sort-feature">
                <label for="min_vote-discover">Min. rating:</label>
                <select name="min_vote-discover" id="min_vote-discover" >
                  <option value=0>All rated</option>
                </select>
              </div>           
            </li>
            <li class="nav-item me-lg-4 mb-3">
              <div class="sort-feature">
                <label for="genre-discover">Genre:</label>
                <select name="genre-discover" id="genre-discover" >
                  <option value="undefined">All genres</option>
                </select>
              </div>
            </li>
            <li class="nav-item me-lg-4 mb-3">
              <div class="sort-feature">
                <label for="year-movie">Select year:</label>
                <select name="year-movie" id="year-movie" >
                  <option value="undefined">All year</option>
                </select>
              </div>
            </li>
            <li class="nav-item me-lg-4 mb-3">
              <div class="sort-feature" id="language-search_wrapper">
                <label for="select-country_discover">Language: </label>
                  <div id="select-language-wrapper">
                    <input placeholder="search language..." id="select-country_input" list="select-country_discover">
                    <datalist id="select-country_discover">
                      <option value=" ">All Language</option>
                    </datalist>
                    <i id="lang_search-discovery" class="fa-solid fa-magnifying-glass ms-1"></i>
                  </div>
              </div>              
            </li>
          </ul>
        </div>


        <div class="collapse navbar-collapse justify-content-end" id="navbarSortMovie">
          <ul class="navbar-nav">
            <li class="nav-item me-lg-4 mb-3">
              <div id="reset-button__wrapper" class="sort-feature">
                <button id="reset_button-discover">Reset filter</button>
              </div>              
            </li>
          </ul>
        </div>
      </div>
    </nav>
      
    `;

    document.querySelector('#sort-movie').addEventListener('change', () => {
      document.querySelector('#first_page-button-movies').click();
    });

    document.querySelector('#year-movie').addEventListener('change', () => {
      document.querySelector('#first_page-button-movies').click();
    });

    document.querySelector('#genre-discover').addEventListener('change', () => {
      document.querySelector('#first_page-button-movies').click();
    });

    document.querySelector('#min_vote-discover').addEventListener('change', () => {
      document.querySelector('#first_page-button-movies').click();
    });

    document.querySelector('#lang_search-discovery').addEventListener('click', () => {
      document.querySelector('#first_page-button-movies').click();
    });

    document.querySelector('#reset_button-discover').addEventListener('click', () => {
      document.querySelector('#sort-movie').value = 'popularity.desc';
      document.querySelector('#min_vote-discover').value = 0;
      document.querySelector('#genre-discover').value = undefined;
      document.querySelector('#year-movie').value = undefined;
      document.querySelector('#select-country_input').value = '';
      document.querySelector('#first_page-button-movies').click();
    });
  }
}

customElements.define('sort-by', SortByMovie);
