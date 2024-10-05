interface PaginatedButtonsProps {
  currentPage: number;
  maxPages: number;
  changePage: (page: number) => void;
}

const PaginatedButtons: React.FC<PaginatedButtonsProps> = ({
  currentPage,
  maxPages,
  changePage,
}) => {
  return (
    <div>
      {currentPage - 1 > 0 && (
        <button onClick={() => changePage(currentPage - 1)}>
          {currentPage - 1}
        </button>
      )}
      <button disabled>{currentPage}</button>{" "}
      {currentPage + 1 <= maxPages && (
        <button onClick={() => changePage(currentPage + 1)}>
          {currentPage + 1}
        </button>
      )}
    </div>
  );
};

export default PaginatedButtons;
