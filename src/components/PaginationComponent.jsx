import { Pagination } from "react-bootstrap";
import PropTypes from "prop-types";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)} 
      />
      
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item 
          key={index + 1} 
          active={index + 1 === currentPage} 
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)} 
      />
    </Pagination>
  );
};

PaginationComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
}

export default PaginationComponent;