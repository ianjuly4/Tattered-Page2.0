import React, {useContext} from "react";
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from 'yup';
import Header from "./Header";
import { NavLink } from "react-router-dom";

const Register = ()=>{
const {user, login} = useContext(MyContext)
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
              login(values.searchTerm, values.filter);
                
            },
          });
    return(
        <div className="login">
            <Header/>
            <div className="login-container">
                    
                    <div className="login-form">
                        <h3>Login</h3>
                        <input
                        className="login-input"
                        type="text"
                        placeholder="Username"
                        value={formik.values.Username}
                        onChange={formik.handleChange}
                        name="Username"
                        />
                        <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={formik.values.Password}
                        onChange={formik.handleChange}
                        name="Password"
                        />
                        <button className="login-btn" type="submit">Login</button>
                        <span>Don't Have An Account? Create One <NavLink to="/auth/register" className="register-link">Here</NavLink></span>
                    </div>
                </div>
        </div>
    )

}

export default Register;