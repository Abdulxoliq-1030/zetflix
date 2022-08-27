import { range } from "../helpers/range";

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = range(1, pageCount);

  return (
    <ul className='pagination'>
      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}>
          <span className='page-link'>{page}</span>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
