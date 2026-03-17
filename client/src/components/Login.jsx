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
      navigate(`/users/${user.id}`)
    }
  }, [user, isLoggedIn])

  /* Either create a useEffect or create a redirect if a user is logged in*/


  const formError = loginError || loginFormik.errors.email || loginFormik.errors.password ;
    return(
        <div className="login">
            <Header/>
            <div className="login-container">
                    <form className="login-form" onSubmit={loginFormik.handleSubmit}>
                        <h3>Login</h3>
                        {formError && <span className='login-form-errors'>{formError}</span>}
                        <input
                        className="login-input"
                        type="text"
                        name="email"
                        placeholder="email"
                        value={loginFormik.values.email}
                        onChange={loginFormik.handleChange}
                        />
                        <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="Password"
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