import React, {useContext} from "react";
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from 'yup';
import Header from "./Header";
import { NavLink } from "react-router-dom";

const Login = () =>{
    const {user, login} = useContext(MyContext)

const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username.").max(25),
    password: yup.string().required("Must enter a password").max(25),
  });

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      login(values.username, values.password);
    },
  });

    return(
        <div className="login">
            <Header/>
            <div className="login-container">
                    <form className="login-form" onSubmit={loginFormik.handleSubmit}>
                        <h3>Login</h3>
                        <span className="login-form-errors">{loginFormik.errors.username || loginFormik.errors.password}</span>
                        <input
                        className="login-input"
                        type="text"
                        name="username"
                        placeholder="username"
                        value={loginFormik.values.username}
                        onChange={loginFormik.handleChange}
                        />
                        <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange}
                       
                        />
                        <button className="login-btn" type="submit">Login</button>
                        <span>Don't Have An Account? Create One <NavLink to="/auth/register" className="register-link">Here</NavLink></span>
                    </form>
                </div>
        </div>
    )

}
export default Login;