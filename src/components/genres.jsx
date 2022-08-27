
const Genres = ({ genres = [], genreID, onSelect }) => {
  return (
    <div className='col-2'>
      <ul className='list-group'>
        {genres.map((genre) => (
          <li
            key={genre._id}
            className={`list-group-item ${genre._id === genreID && "active"}`}
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(genre._id)}>
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;

