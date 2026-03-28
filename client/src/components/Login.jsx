import React, {useContext, useEffect} from "react";
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from 'yup';
import Header from "./Header";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () =>{
  const {user, login, loginError, isLoggedIn} = useContext(MyContext)
  const navigate = useNavigate()

 
  const formSchema = yup.object().shape({
      email: yup.string().required("Must enter a email.").max(25),
      password: yup.string().required("Must enter a password").max(25),
    });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  useEffect(() =>{
    if(user && isLoggedIn){
      navigate(`/user/${user.id}`)
    }
  }, [user, isLoggedIn])

  


    return(
        <div className="login">
            <Header/>
            <div className="login-container">
                    <form className="login-form" onSubmit={loginFormik.handleSubmit}>
                        <h3>Login</h3>
                        {loginError && (<span className="login-form-errors">{loginError}</span>)}
                        <input
                        className="login-input"
                        type="text"
                        name="email"
                        placeholder="email"
                        value={loginFormik.values.email}
                        onChange={loginFormik.handleChange}
                        />
                        {loginFormik.touched.email && loginFormik.errors.email && (<span classname="login-form-errors">{loginFormik.errors.email}</span>)}
                        <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginFormik.values.password}
                        onChange={loginFormik.handleChange}
                        />
                        {loginFormik.touched.password && loginFormik.errors.password && (<span classname="login-form-errors">{loginFormik.errors.password}</span>)}
                        <button className="login-btn" type="submit">Login</button>
                        <span>Don't Have An Account? Create One <NavLink to="/auth/register" className="register-link">Here</NavLink></span>
                    </form>
                </div>
        </div>
    )

}
export default Login;