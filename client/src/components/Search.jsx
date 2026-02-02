import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../MyContext"; 
import { useFormik } from "formik";
import * as yup from 'yup';


const Search = () => {
    const {fetchBooks} = useContext(MyContext)
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
    return (
        <form onSubmit={formik.handleSubmit} className="flex items-center space-x-0">
          <div className="form-control relative flex items-center w-96">
            <select
              className="select select-bordered absolute right-20 pl-1"
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
              className="input input-bordered pl-2 pr-16 w-full"
              value={formik.values.searchTerm}
              onChange={formik.handleChange}
              name="searchTerm"
            />
            {/* Show errors only after submit */}
            {formik.submitCount > 0 && formik.errors.searchTerm && (
              <div className="text-white text-xs">{formik.errors.searchTerm}</div>
            )}

            <button type="submit" className="btn btn-ghost ml-2 absolute right-1">
              Enter
            </button>
          </div>
        </form>
    )
}
export default Search; 