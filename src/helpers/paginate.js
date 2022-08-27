export const paginate = (items = [], pageSize, currentPage) => {
  const startIdx = pageSize * (currentPage - 1);
  const endIdx = startIdx + pageSize;
  return items.slice(startIdx, endIdx);
};

/**
 *                    startIdx     endIdx
 * items = ["a","b","c","d","e","f","g","h"] -> length = 8
 * pageSize = 3;
 * currentPage = 2
 * startIdx = pageSize * (currentPage - 1) -> 3
 * endPage
 */
