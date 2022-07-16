import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/';

export class GalleryApi {
  #API_KEY = 'f529977bca559aa35fc4139c14353d12';

  constructor() {
    this.page = 1;
    this.query = null;
    this.perPage = null;
  }

  fetchMovies() {
    axios.defaults.params = {
      api_key: this.#API_KEY,
      query: this.query,
      per_page: this.perPage,
      page: this.page,
    };

    return axios(`3/search/movie`).then(response => response.data);
  }

  fetchRandomMovies() {
    return axios(
      `3/discover/movie?api_key=f529977bca559aa35fc4139c14353d12&sort_by=popularity.desc&per_page=${this.perPage}`
    ).then(response => response.data);
  }

  fetchGenres() {
    axios.defaults.params = {
      api_key: this.#API_KEY,
      language: 'en-US',
    };

    return axios(`3/genre/movie/list`).then(response => response.data.genres);
  }

  fetchMovieById(id) {
    return axios(
      `3/movie/${id}?api_key=f529977bca559aa35fc4139c14353d12&language=en-US`
    ).then(response => response.data);
  }
}