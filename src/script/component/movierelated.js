import DataSource from '../data/data-source';
import DataExtends from '../data/getdetailmovies';
import './movieitem';
const _ = require('lodash');

class RelatedMovie extends HTMLElement {
  set related(related) {
    this._related = related;
    this.render();
  }


  render(){
    this.innerHTML = `
    <h2>Related Movie</h2>
      <div class="related-movies">

      </div>
      <div id="drop-down-movie__related" class="drop-down-movie">
        <i class="fa-solid fa-circle-chevron-down"></i>
      </div>
    `;

    const relatedMoviesChunck = _.chunk(this._related, 8);

    const relatedMoviesWrapper = document.querySelector('.related-movies');

    const closeButton = document.querySelector('.btn-close');
      closeButton.addEventListener('click', ()=> {
        this.innerHTML = ``;
    });

    let chunkNo = 0;

    const dropRelatedBtn = document.querySelector('#drop-down-movie__related');
    dropRelatedBtn.addEventListener('click', ()=> {
      chunkNo = chunkNo + 1;
      renderRelated();
    })


    
    const renderRelated = () => {
      relatedMoviesChunck[chunkNo]?
      DataSource.searchMovie()
        .then(results => {
          const getMovieGenres = () => {
            return relatedMoviesChunck[chunkNo].map(movie => {
              return {
                ...movie, genre_ids: movie.genre_ids.map(number => results[0].find(genreCode => genreCode.id === number).name)
              }
            })
          }

          const completeMovies = getMovieGenres();

          for (let i = 0; i< relatedMoviesChunck[chunkNo].length ; i++) {
            const movieItemElement = document.createElement('movie-item');

            DataExtends.getMovieDetail(relatedMoviesChunck[chunkNo][i].id)
              .then(results => {
                const movieDetails =  results[0].data;
                const videoKeys = results[1].data.results[0] === undefined?' ': results[1].data.results[0].key;
                const listActors = results[2].data.cast;
    
                movieItemElement.detailMovie = [movieDetails,videoKeys, listActors, completeMovies[i]];

                relatedMoviesWrapper.appendChild(movieItemElement);
    
              });
          }  
      }): null;
    }

    renderRelated();
      


      
  }
}

customElements.define('related-movie', RelatedMovie);