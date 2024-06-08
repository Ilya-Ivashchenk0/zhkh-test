import './pagination.css';
import { observer } from 'mobx-react-lite';
import { paginationProps } from './types';

export const Pagination: React.FC<paginationProps> = observer(
  ({ totalPages, currentPage, onPageChange }) => {
    const handlePageClick = (page: number) => {
      onPageChange(page);
    };

    const renderPageNumbers = () => {
      const pageNumbers = [];
      const maxPageNumbers = 3;

      if (totalPages <= maxPageNumbers + 2) {
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={
                currentPage === i
                  ? 'pagination__button active'
                  : 'pagination__button'
              }
            >
              {i}
            </button>
          );
        }
      } else {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => handlePageClick(1)}
            className={
              currentPage === 1
                ? 'pagination__button active'
                : 'pagination__button'
            }
          >
            1
          </button>
        );

        if (currentPage > maxPageNumbers) {
          pageNumbers.push(
            <button
              className="pagination__button disabled"
              key="start-ellipsis"
            >
              ...
            </button>
          );
        }

        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handlePageClick(i)}
              className={
                currentPage === i
                  ? 'pagination__button active'
                  : 'pagination__button'
              }
            >
              {i}
            </button>
          );
        }

        if (currentPage < totalPages - maxPageNumbers) {
          pageNumbers.push(
            <button className="pagination__button disabled" key="end-ellipsis">
              ...
            </button>
          );
        }

        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            className={
              currentPage === totalPages
                ? 'pagination__button active'
                : 'pagination__button'
            }
          >
            {totalPages}
          </button>
        );
      }

      return pageNumbers;
    };

    return <div className="pagination">{renderPageNumbers()}</div>;
  }
);
