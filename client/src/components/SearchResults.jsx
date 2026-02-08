import React, {useState} from "react";
import { NavLink, useLocation } from "react-router-dom";
import BookCard from "./BookCard";

const SearchResults = ({books}) =>{
    console.log(books.length)
    console.log(books)

    return(
        <div className="searchresults">
            {books.map((book) => (
                  <NavLink key={book.id} to={`/books/${book.id}`}>
                    <div>
                      <BookCard book={book} />
                    </div>
                  </NavLink>
                ))}
        </div>
    )
}
export default SearchResults;