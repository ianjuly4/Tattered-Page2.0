import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext"; 
import { useFormik } from "formik";
import * as yup from 'yup';
import SearchResults from "./SearchResults"
import Header from "./Header";


const Search = () => {
    const {fetchBooks, books} = useContext(MyContext)
    const formSchema = yup.object().shape({
    searchTerm: yup.string().required("Must enter a search term").max(100),
    filter: yup.string().required("Must filter search term").oneOf(["title", "author", "genre"]),
  });

  const searchFormik = useFormik({
    initialValues: {
      searchTerm: "",
      filter: "title",  
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetchBooks(values.searchTerm, values.filter);
        
    },
  });
  console.log(books)
   return (
  <div className="search">
    <Header />
        <div className="search-form" onSubmit={searchFormik}>
          <form onSubmit={searchFormik.handleSubmit}>
            <select
              name="filter"
              value={searchFormik.values.filter}
              onChange={searchFormik.handleChange}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
            </select>

            <input
              type="text"
              placeholder="Search"
              value={searchFormik.values.searchTerm}
              onChange={searchFormik.handleChange}
              name="searchTerm"
            />

            <button type="submit">Enter</button>
          </form>
        </div>

      {/* Grid lives inside SearchResults */}
      <SearchResults books={books} />

    
  </div>
);

}
export default Search; 