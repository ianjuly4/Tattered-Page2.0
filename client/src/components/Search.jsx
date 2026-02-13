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

  const formik = useFormik({
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
  <div>
    <Header />

    <div className="page-container">

      {/* Top Bar */}
      <div className="top-bar">
        <div className="search">
          <form onSubmit={formik.handleSubmit}>
            <select
              name="filter"
              value={formik.values.filter}
              onChange={formik.handleChange}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
            </select>

            <input
              type="text"
              placeholder="Search"
              value={formik.values.searchTerm}
              onChange={formik.handleChange}
              name="searchTerm"
            />

            <button type="submit">Enter</button>
          </form>
        </div>
      </div>

      {/* Grid lives inside SearchResults */}
      <SearchResults books={books} />

    </div>
  </div>
);

}
export default Search; 