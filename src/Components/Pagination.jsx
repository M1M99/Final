import React from 'react';
import './pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    const generatePageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <a
                    key={i}
                    href="#"
                    className={i === currentPage ? 'active' : ''}
                    onClick={() => handleClick(i)}
                >
                    {i}
                </a>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            <a
                href="#"
                className="arrow"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &#8592;
            </a>
            {generatePageNumbers()}
            <a
                href="#"
                className="arrow"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &#8594;
            </a>
        </div>
    );
};

export default Pagination;
