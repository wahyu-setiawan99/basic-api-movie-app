import '../component/movieslider';
import '../component/movielistdiscover';
import '../component/movielistfavorite';
import '../component/movielistfound';
import '../component/queryinput';
import '../component/sortbymovie';
import '../component/paginationdiscover';
import '../component/paginationfounds';
import '../component/paginationfavorite';
import '../component/crewitem';

import DataSource from '../data/data-source';
import DataSearch from '../data/search-movie';

const main = () => {
  const movieDiscover = document.querySelector('discover-list');
  const favoriteListMovies = document.querySelector('favorite-list');
  const discoverPagination = document.querySelector('pagination-discover');
  const favoritePagination = document.querySelector('favorite-pagination');
  const searchMoviePagination = document.querySelector('pagination-founds');
  const movieSlider = document.querySelector('movie-slider');
  const movieSearch = document.querySelector('found-list');
  const searchElement = document.querySelector('query-input');
  const sortByDiscover = document.querySelector('sort-by');

  const renderResult = (results) => {
    const selectYear = document.querySelector('#year-movie');
    for (let i = 2023; i > 1949; i -= 1) {
      const optionYear = document.createElement('option');
      optionYear.value = i;
      optionYear.innerText = i;
      selectYear.appendChild(optionYear);
    }

    const selectMinVOte = document.querySelector('#min_vote-discover');
    for (let i = 1; i < 10; i += 1) {
      const optionMinVote = document.createElement('option');
      optionMinVote.value = i;
      optionMinVote.innerText = i;
      selectMinVOte.appendChild(optionMinVote);
    }

    const getAllGenresFilter = () => results[0].map((genre) => genre.name);
    const listGenre = getAllGenresFilter();

    const selectGenreDisc = document.querySelector('#genre-discover');
    listGenre.forEach((element) => {
      const optionGenreDisc = document.createElement('option');
      optionGenreDisc.value = element;
      optionGenreDisc.innerText = element;

      selectGenreDisc.appendChild(optionGenreDisc);
    });

    const selectCountryDiscover = document.querySelector('#select-country_discover');
    results[1].forEach((country) => {
      const optionCountryDisc = document.createElement('option');
      optionCountryDisc.value = country.iso_639_1;
      optionCountryDisc.innerText = country.english_name;

      selectCountryDiscover.appendChild(optionCountryDisc);
    });

    const trendMovie = () => results[2].map((trendy) => ({
      ...trendy,
      genre_ids: trendy.genre_ids.map(
        (number) => results[0].find((genreCode) => genreCode.id === number).name,
      ),
    }));
    const trendMovies = trendMovie();
    movieSlider.sliders = trendMovies;
  };

  const renderDiscover = (results) => {
    const discoverMovie = () => results[1].map((movie) => ({
      ...movie,
      genre_ids: movie.genre_ids.map((number) => results[0].find(
        (genreCode) => genreCode.id === number,
      ).name),
    }));
    const discoverMovies = discoverMovie();
    movieDiscover.discover = discoverMovies;
  };

  const errorDiscover = (message) => {
    movieDiscover.renderError(message);
  };

  const renderFavMovie = (results) => {
    const favoriteMovie = () => results[1].map((movie) => ({
      ...movie,
      genre_ids: movie.genre_ids.map(
        (number) => results[0].find((genreCode) => genreCode.id === number).name,
      ),
    }));
    const favMovies = favoriteMovie();
    favoriteListMovies.favorite = favMovies;
  };

  const renderSearch = (results) => {
    const searchQuery = () => results[1].map((movie) => ({
      ...movie,
      genre_ids: movie.genre_ids.map((number) => results[0].find(
        (genreCode) => genreCode.id === number,
      ).name),
    }));
    const moviesbyQuery = searchQuery();
    movieSearch.founds = moviesbyQuery;
  };

  const errorNofounds = (message) => {
    movieSearch.renderError(message);
  };

  const onGetDefaultMovies = () => {
    DataSource.getBasicData()
      .then(renderResult)
      .catch((error) => console.log(error));
  };

  const onGetDiscoverMovie = () => {
    DataSource.getGenreList()
      .then((results) => {
        const filteredGenre = results[0].filter(
          (genre) => sortByDiscover.genreDiscovery === genre.name,
        )[0];
        const genreIds = filteredGenre === undefined ? null : filteredGenre.id;
        return genreIds;
      })
      .then((genreIds) => {
        DataSource.discoveryMovie(
          discoverPagination.value,
          sortByDiscover.option,
          sortByDiscover.yearMovie,
          genreIds,
          sortByDiscover.minVoteDiscovery,
          sortByDiscover.countryCode,
        )
          .then(renderDiscover)
          .catch(errorDiscover);
      });
  };

  const onGetFavoriteMovies = () => {
    DataSource.favoriteMovie(favoritePagination.value)
      .then(renderFavMovie)
      .catch((error) => console.log(error));
  };

  const onSearchMovieButton = () => {
    DataSearch.searchMovie(searchElement.value, searchMoviePagination.value)
      .then(renderSearch)
      .catch(errorNofounds);
  };

  window.onload = () => {
    onGetDefaultMovies();
    onGetDiscoverMovie();
    onGetFavoriteMovies();
  };

  discoverPagination.clickEvent = () => {
    onGetDiscoverMovie();
  };

  favoritePagination.clickEvent = () => {
    onGetFavoriteMovies();
  };

  searchMoviePagination.clickEvent = () => {
    onSearchMovieButton();
  };
};

export default main;
