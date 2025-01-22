import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  padding-bottom: 45px;
`;

const PageButton = styled.button`
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #222B44;
  border-radius: 5px;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #313E62;
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
`;

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      <PageButton onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </PageButton>
      <span style={{ alignSelf: 'center', color: '#fff' }}>
        Page {currentPage} of {totalPages}
      </span>
      <PageButton onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
