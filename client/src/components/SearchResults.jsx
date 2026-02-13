import React from "react";
import { NavLink } from "react-router-dom";
import BookCard from "./BookCard";

const SearchResults = ({ books }) => {
  return (
    <div className="searchresults">
      {books.map((book) => (
        <NavLink
          key={book.id}
          to={`/books/${book.id}`}
          className="book-link"   
        >
          <BookCard book={book} />
        </NavLink>
      ))}
    </div>
  );
};

export default SearchResults;
