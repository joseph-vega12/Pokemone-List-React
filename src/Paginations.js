import React from "react";

export default function Paginations({goToNextPage, goToPrevPage}) {
  return (
    <div>
      {goToPrevPage && <button onClick={goToPrevPage}>Previous</button>}
      {goToNextPage && <button onClick={goToNextPage}>Next</button>}
    </div>
  );
}
