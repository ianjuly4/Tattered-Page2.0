import React, {useContext} from "react";
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from 'yup';
import Header from "./Header";


const Login = () =>{
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
                    <h2>Please Login </h2>
                    <div className="account-login-form">
                        <h3>Login</h3>
                        <input
                        className="account-login-input"
                        type="text"
                        placeholder="Username"
                        value={formik.values.Username}
                        onChange={formik.handleChange}
                        name="Username"
                        />
                        <input
                        className="account-login-input"
                        type="text"
                        placeholder="Password"
                        value={formik.values.Password}
                        onChange={formik.handleChange}
                        name="Password"
                        />
                        <button className="account-login-btn" type="submit">Login</button>
                        <span>Don't Have An Account? Create One Here</span>
                    </div>
                </div>
        </div>
    )

}
export default Login;