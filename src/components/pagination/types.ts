export interface paginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
