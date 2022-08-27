import { toast } from "react-toastify";
import { number, object, string } from "yup";
import Form from "../components/common/form";
import { getGenres, createMovie, getMovie, updateMovie } from "../services";

class Movie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    options: [],
    isEdit: false,
  };

  schema = object({
    title: string().min(5).max(50).required().label("Title"),
    genreId: string().required().label("Genre"),
    numberInStock: number()
      .min(0)
      .max(255)
      .required()
      .label("Stock")
      .typeError("Is number"),
    dailyRentalRate: number()
      .min(0)
      .max(255)
      .required()
      .label("Rate")
      .typeError("Is number"),
  });

  doSubmit = async () => {
    const { isEdit, data } = this.state;
    const { movieID } = this.props.match.params;

    try {
      if (isEdit) {
        const { title } = (await updateMovie(movieID, data)).data;
        toast.success(`Success update movie = ${title}`);
      } else {
        const { title } = (await createMovie(this.state.data)).data;
        toast.success(`Success create movie = ${title}`);
      }
      this.props.history.replace("/");
    } catch (err) {}
  };

  async componentDidMount() {
    const { movieID } = this.props.match.params;
    const data = { ...this.state.data };
    let isEdit = this.state.isEdit;
    try {
      if (movieID !== "new") {
        const movie = (await getMovie(movieID)).data;
        data.title = movie.title;
        data.dailyRentalRate = movie.dailyRentalRate;
        data.numberInStock = movie.numberInStock;
        data.genreId = movie.genre._id;
        isEdit = true;
      }
    } catch (err) {
      // Expected errors (401-unauth,403-forbidden,404-not-found,400-bad-request)
      // Unexpected errors (500-server-ochdi,403-forbidden,404-not-found,400-bad-request)
      err = JSON.parse(JSON.stringify(err));

      if (err.status === 404) {
        toast.warning(`not found movie ${movieID}`);
        setTimeout(() => this.props.history.replace("/"), 500);
      }
    }
    const genres = (await getGenres()).data;
    this.setState({ options: genres, isEdit, data });
  }

  render() {
    return (
      <>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Movie title")}
          {this.renderSelect("genreId", "Select Genre", this.state.options)}
          {this.renderInput("numberInStock", "Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton(this.state.isEdit ? "Save Movie" : "Create Movie")}
        </form>
      </>
    );
  }
}

export default Movie;
