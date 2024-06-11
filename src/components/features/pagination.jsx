// import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";

import ALink from "../common/ALink";

function Pagination({ totalPage, onPageChange }) {
  console.log("pagination ", totalPage);
  const [currentPage, setCurrentPage] = useState(1);

  // const query = useRouter().query;
  const page = 1;
  let indexsToShow = [];

  for (let i = 0; i < Math.min(totalPage, 3); i++) {
    if (page < 4 || page > totalPage - 3) {
      if (page < 4) {
        indexsToShow[i] = i + 1;
      }

      if (totalPage > 4 && page > totalPage - 3) {
        indexsToShow[i] = totalPage - 2 + i;
      }
    } else {
      indexsToShow[i] = page - 1 + i;
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <>
      {totalPage > 0 && (
        <ul className="pagination toolbox-item">
          {currentPage > 1 && (
            <li className="page-item">
              <ALink
                className="page-link page-link-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                scroll={false}
              >
                <i className="icon-angle-left"></i>
              </ALink>
            </li>
          )}

          {indexsToShow.map((item) => (
            <li
              className={`page-item ${currentPage === item ? "active" : ""}`}
              key={`page-${item}`}
            >
              <ALink
                className="page-link"
                href={""}
                onClick={() => handlePageChange(item)}
                scroll={false}
              >
                {item}
                {page === item && <span className="sr-only">(current)</span>}
              </ALink>
            </li>
          ))}

          {currentPage < totalPage && (
            <li className="page-item">
              <ALink
                className="page-link page-link-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                scroll={false}
              >
                <i className="icon-angle-right"></i>
              </ALink>
            </li>
          )}
        </ul>
      )}
    </>
  );
}

export default React.memo(Pagination);
