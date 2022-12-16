import '../component/movielist';
import '../component/movielisttop';
import '../component/paginations';
import '../component/movieslider';
import DataSource from '../data/data-source';

const main = () => {
  const movieListElement = document.querySelector('movie-list');
  const topListElement = document.querySelector('top-list');
  const pageElement = document.querySelector('movie-pagination');
  const movieSlider = document.querySelector('movie-slider');
  



  const onButtonSearchClicked = () => {
    DataSource.searchMovie(pageElement.value)
      .then(renderResult)
      .catch(fallbackResult)
  };





  const renderResult = results => {
    // console.log(results);
  
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


  const fallbackResult = message => {
    movieListElement.renderError(message);
  };






  window.onload = () => {
    onButtonSearchClicked();    
  }

  
  pageElement.pageMovie = function () {
    onButtonSearchClicked();
    }


};

export default main;
