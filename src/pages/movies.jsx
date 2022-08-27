import { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { getMovies, getGenres, deleteMovie } from "../services";
import { paginate } from "../helpers/paginate";
import { MoviesTable, Genres, Loader, Total } from "../components";

/**
 * @imports
 * ✅ packages
 * ✅ functions(utils|helpers)
 * ✅ components
 * ✅ assets -> images -> styles
 *
 */

class Movies extends Component {
  state = {
    loading: true,
    movies: [],
    genres: [],
    genreID: "all",
    currentPage: 1,
    pageSize: 3,
    columnSort: {
      path: "title",
      order: "asc",
    },
  };

  handleSelectGenre = (newGenreID) => {
    this.setState({ genreID: newGenreID, currentPage: 1 });
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  handleLike = (movieID) => {
    const movies = [...this.state.movies];
    const movie = movies.find((movie) => movie._id === movieID);

    movie.isLiked = !movie.isLiked;
    this.setState({ movies });
  };

  handleDeleteMovie = (movieID) => {
    const movies = this.state.movies.filter((movie) => movie._id !== movieID);
    this.setState({ movies });
    deleteMovie(movieID);
    toast.error(`Deleted Movie = ${movieID}`);
  };

  async componentDidMount() {
    const movies = (await getMovies()).data;
    console.log("movies = ", movies);

    const genres = (await getGenres()).data;

    genres.unshift({ name: "All", _id: "all" });

    this.setState({ loading: false, movies, genres });
  }

  render() {
    console.log("Movies Render");

    if (this.state.loading) return <Loader />;

    const { movies, genres, genreID, pageSize, currentPage, columnSort } =
      this.state;

    const filteredMovies = movies.filter(
      (movie) => genreID === "all" || movie.genre._id === genreID
    );

    const sortedMovies = _.orderBy(
      filteredMovies,
      columnSort.path,
      columnSort.order
    );

    const paginatedMovies = paginate(sortedMovies, pageSize, currentPage);

    const total = filteredMovies.length;

    return (
      <div className="row d-flex">
        <Genres
          genres={genres}
          genreID={genreID}
          onSelect={this.handleSelectGenre}
        />
        <div className="col">
          <Total total={total} />
          <MoviesTable
            currentPage={currentPage}
            pageSize={pageSize}
            total={total}
            user={this.props.user}
            movies={paginatedMovies}
            onDeleteMovie={this.handleDeleteMovie}
            onPageChange={this.handlePageChange}
            onLike={this.handleLike}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
