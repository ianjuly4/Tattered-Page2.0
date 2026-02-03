import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext"; 
import { useFormik } from "formik";
import * as yup from 'yup';


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
        <form onSubmit={formik.handleSubmit} className="">
          <div className="">
            <select
              className=""
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
              className=""
              value={formik.values.searchTerm}
              onChange={formik.handleChange}
              name="searchTerm"
            />
            {/* Show errors only after submit */}
            {formik.submitCount > 0 && formik.errors.searchTerm && (
              <div className="text-white text-xs">{formik.errors.searchTerm}</div>
            )}

            <button type="submit" className="">
              Enter
            </button>
          </div>
        </form>
    )
}
export default Search; 