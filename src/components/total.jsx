import { Link } from "react-router-dom";

const Total = ({ total }) => {
  return (
    <div className='d-flex align-items-center'>
      <Link to='/movie/new' className='btn btn-primary my-2 d-block me-2'>
        Add Movie
      </Link>
      <b>
        Showing
        <span className='badge bg-dark text-light mx-2'>{total}</span>
        movies on the database
      </b>
    </div>
  );
};

export default Total;
