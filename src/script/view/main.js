import '../component/movielist';
import '../component/movielisttop';
import '../component/paginations';
import '../component/movieslider';
import '../component/movielistfound';
import '../component/searchqueryinput';

import DataSource from '../data/data-source';
import DataSearch from '../component/datasearchquery';

const main = () => {
  const movieListElement = document.querySelector('movie-list');
  const topListElement = document.querySelector('top-list');
  const pageElement = document.querySelector('movie-pagination');
  const movieSlider = document.querySelector('movie-slider');
  const movieSearch = document.querySelector('found-list');
  const searchElement = document.querySelector('query-input');

  

  const onDefault_pageClick = () => {
    DataSource.searchMovie(pageElement.value)
      .then(renderResult)
      .catch(e => console.log(e))
  };

  const onSearchMovieButton = () => {
    DataSearch.searchMovie(searchElement.value)
      .then(renderSearch)
      .catch(fallbackResult)
  }


  const renderResult = results => {
      
    const popularGenre = () =>{
      return results[0].map(movie => {
        return {
          ...movie, genre_ids: movie.genre_ids.map(number => results[2].find(genreCode => genreCode.id === number).name)
        }
      });
    };    
    const popularMovies = popularGenre();
    movieListElement.movies = popularMovies; 

    const topGenre = () =>{
      return results[1].map(movie => {
        return {
          ...movie, genre_ids: movie.genre_ids.map(number => results[2].find(genreCode => genreCode.id === number).name)
        }
      });
    };    
    const topMovies = topGenre();
    topListElement.topmovies = topMovies;

    const trendMovie = () =>{
      return results[3].map(trendy => {
        return {
          ...trendy, genre_ids: trendy.genre_ids.map(number => results[2].find(genreCode => genreCode.id === number).name)
        }
      });
    };    
    const trendMovies = trendMovie();
    movieSlider.sliders = trendMovies; 
  };



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
    movieListElement.renderError(message);
  };



  window.onload = () => {
    onDefault_pageClick();    
  }

  pageElement.pageMovie = function () {
    onDefault_pageClick();
  }

  searchElement.search = function () { 
    onSearchMovieButton()
  };

  


};

export default main;
