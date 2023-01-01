import '../component/moviediscover';
import '../component/movielisttop';
import '../component/paginations';
import '../component/movieslider';
import '../component/movielistfound';
import '../component/searchqueryinput';
import '../component/sortbymovie';
import '../component/paginationfounds';
import '../component/paginationfav';
import '../component/crewitem';

import DataSource from '../data/data-source';
import DataSearch from '../data/datasearchquery';

const main = () => {
  const movieDiscover = document.querySelector('movie-discover');
  const topListElement = document.querySelector('top-list');
  const discoverPagination = document.querySelector('movie-pagination');
  const favoritePagination = document.querySelector('favorite-pagination');
  const searchMoviePagination = document.querySelector('pagination-founds');
  const movieSlider = document.querySelector('movie-slider');
  const movieSearch = document.querySelector('found-list');
  const searchElement = document.querySelector('query-input');
  const sortByDiscover = document.querySelector('sort-by');

  const onGetDefaultMovies = () => {
    DataSource.searchMovie()
      .then(renderResult)
      .catch(e => console.log(e))
  };  
  
  
  const onGetDiscoverMovie = () => {
    DataSource.getGenreList()
      .then(results => {
         const filteredGenre = results[0].filter(genre => sortByDiscover.genreDiscovery === genre.name)[0];
         const genreNumb = filteredGenre === undefined? null: filteredGenre.id;
         return genreNumb
      })
      .then(results => {
        DataSource.discoveryMovie(
          discoverPagination.value,
          sortByDiscover.option,
          sortByDiscover.yearMovie,
          results,
          sortByDiscover.minVoteDiscovery,
          sortByDiscover.countryCode
          )
          .then(renderDiscover)
          .catch(errorDiscover)
      })
  }


  const onGetFavoriteMovies = () => {
    DataSource.favoriteMovie(favoritePagination.value)
      .then(renderFavMovie)
      .catch(error => console.log(error))
  }



  const onSearchMovieButton = () => {
    const diffKeyword = () => {
      if (searchElement.value.length > 0) {
        return searchElement.value;
      } else {
        return 'dawdawdawdawdawdadaddawdawdaw'
      }
    }

    const searchPage = searchMoviePagination.value;

    const queryKeyword = diffKeyword();    
    DataSearch.searchMovie(queryKeyword, searchPage)
      .then(renderSearch)
      .catch(fallbackResult)
  } 
  
  
  
  
  const renderResult = results => {
    const selectYear = document.querySelector('#year-movie');
      for (let i=2023; i>1949; i--) {
        const optionYear = document.createElement('option');
        optionYear.value = i;
        optionYear.innerText = i;
        selectYear.appendChild(optionYear)
      }
  

    const selectMinVOte = document.querySelector('#min_vote-discover');
      for (let i=1; i<10; i++) {
        const optionMinVote = document.createElement('option');
        optionMinVote.value = i;
        optionMinVote.innerText = i;
        selectMinVOte.appendChild(optionMinVote)
      }
  
    const getAllGenresFilter = () => {
      return results[0].map(genre => {
        return genre.name;
      });
    }
    const listGenre = getAllGenresFilter();


    const selectGenreDisc = document.querySelector('#genre-discover');
    listGenre.forEach(element => {
      const optionGenreDisc = document.createElement('option');
      optionGenreDisc.value = element;
      optionGenreDisc.innerText = element;

      selectGenreDisc.appendChild(optionGenreDisc);
      
    });

    const selectCountryDiscover = document.querySelector('#select-country_discover');
    results[1].forEach(country => {
      const optionCountryDisc = document.createElement('option');
      optionCountryDisc.value = country.iso_639_1;
      optionCountryDisc.innerText = country.english_name;
      ;

      selectCountryDiscover.appendChild(optionCountryDisc);
    });

    const trendMovie = () =>{
      return results[2].map(trendy => {
        return {
          ...trendy, genre_ids: trendy.genre_ids.map(number => results[0].find(genreCode => genreCode.id === number).name)
        }
      });
    };    
    const trendMovies = trendMovie();
    movieSlider.sliders = trendMovies;
  };




  const renderFavMovie = results => {
    const favoriteMovie = () =>{
      return results[1].map(movie => {
        return {
          ...movie, genre_ids: movie.genre_ids.map(number => results[0].find(genreCode => genreCode.id === number).name)
        }
      });
    };    
    const favMovies = favoriteMovie();
    topListElement.topmovies = favMovies;
  }






  const renderDiscover = results => {
    const discoverMovie = () =>{
      return results[1].map(discover => {
        return {
          ...discover, genre_ids: discover.genre_ids.map(number => results[0].find(genreCode => genreCode.id === number).name)
        }
      });
    };
    const discoverMovies = discoverMovie();
    movieDiscover.discover = discoverMovies;
  }

  const errorDiscover = message => {
    movieDiscover.renderError(message);
  }


  const renderSearch = results => {
    const searchQuery = () =>{
      return results[0].map(movie => {
        return {
          ...movie, genre_ids: movie.genre_ids.map(number => results[1].find(genreCode => genreCode.id === number).name)
        }
      });
    };    
    const moviesbyQuery = searchQuery();
    movieSearch.founds = moviesbyQuery;
  }


  const fallbackResult = message => {
    movieSearch.renderError(message);
  };


  

  window.onload = () => {
    onGetDefaultMovies(); 
    onGetDiscoverMovie();
    onGetFavoriteMovies();
  }

  discoverPagination.clickEvent = () => {
    onGetDiscoverMovie();
  }

  favoritePagination.clickEvent = () => {
    onGetFavoriteMovies();
  }

  searchMoviePagination.clickEvent = () => {
    onSearchMovieButton();
  }

};

export default main;
