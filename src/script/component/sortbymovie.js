class SortByMovie extends HTMLElement {
  connectedCallback(){
    this.render();
  }



  get option () {
    return document.querySelector('#sort-movie').value;
  }

  get yearMovie () {
    return document.querySelector('#year-movie').value;
  }

  get genreDiscovery () {
    return document.querySelector('#genre-discover').value;
  }

  get minVoteDiscovery () {
    return document.querySelector('#min_vote-discover').value;
  }

  get countryCode () {
    return document.querySelector('#select-country_input').value;
  }



  render(){
    this.innerHTML=`
      <div id="sort-discover_movie">
        <label for="sort-movie">Sort by: </label>
        <select name="sort-movie" id="sort-movie" class="select-sort">
          <option value="popularity.desc">Popularity</option>
          <option value="vote_count.desc">Vote count</option>
          <option value="release_date.desc">Release date</option>
          <option value="vote_average.desc">Rating</option>
          <option value="original_title.desc">Title</option>
        </select>

        <label for="min_vote-discover">Min. rating:</label>
        <select name="min_vote-discover" id="min_vote-discover" class="select-sort">
          <option value=0>All rated</option>

        </select>


        <label for="genre-discover">Genre:</label>
        <select name="genre-discover" id="genre-discover" class="select-sort">
          <option value="undefined">All genres</option>

        </select>


        <label for="year-movie">Select year:</label><br>
        <select name="year-movie" id="year-movie" class="select-sort">
          <option value="undefined">All year</option>
          
        </select>


        
        <div class="select-sort" id="language-search_wrapper">
          <i id="lang_search-discovery" class="fa-solid fa-magnifying-glass"></i>
          <label for="select-country_discover">Language: </label>
          <input placeholder="search language..." id="select-country_input" list="select-country_discover">
          <datalist id="select-country_discover">
            <option value=" ">All Language</option>

          </datalist>
        </div>
      </div>
      
      <div id="reset-button__wrapper" class="select-sort">
        <button id="reset_button-discover">Reset filter</button>
      </div>
    `;

    document.querySelector('#sort-movie').addEventListener('change', ()=> {
      document.querySelector('#first_page-button-movies').click();        
    });

    document.querySelector('#year-movie').addEventListener('change', ()=> {
      document.querySelector('#first_page-button-movies').click();
    });

    document.querySelector('#genre-discover').addEventListener('change', ()=> {
      document.querySelector('#first_page-button-movies').click();
    });

    document.querySelector('#min_vote-discover').addEventListener('change', ()=> {
      document.querySelector('#first_page-button-movies').click();
    });

    document.querySelector('#lang_search-discovery').addEventListener('click', ()=> {      
      document.querySelector('#first_page-button-movies').click();
    });


    document.querySelector('#reset_button-discover').addEventListener('click', ()=> {
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