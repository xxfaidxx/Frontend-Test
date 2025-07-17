// Pagination.js
const Pagination = ({ page, setPage, total, size }) => {
  const totalPages = Math.ceil(total / size);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 2 || i === totalPages || Math.abs(i - page) <= 1) {
        pages.push(
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded text-sm font-medium ${
              page === i
                ? "bg-orange-500 text-white"
                : "hover:bg-gray-200 text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === 3 && page > 5) ||
        (i === totalPages - 1 && page < totalPages - 4)
      ) {
        pages.push(
          <span key={`dots-${i}`} className="px-2">
            ...
          </span>
        );
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-8 space-x-1 items-center">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className="px-2 py-1 text-gray-500 disabled:opacity-40"
      >
        ≪
      </button>
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-2 py-1 text-gray-500 disabled:opacity-40"
      >
        ‹
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-2 py-1 text-gray-500 disabled:opacity-40"
      >
        ›
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        className="px-2 py-1 text-gray-500 disabled:opacity-40"
      >
        ≫
      </button>
    </div>
  );
};

export default Pagination;
