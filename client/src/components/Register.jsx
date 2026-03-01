import React, {useContext} from "react";
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from 'yup';
import Header from "./Header";
import { NavLink } from "react-router-dom";

const Register = ()=>{
  const {user, register, registerError} = useContext(MyContext)
  const formSchema = yup.object().shape({
            searchTerm: yup.string().required("Must enter a search term").max(100),
            filter: yup.string().required("Must filter search term").oneOf(["title", "author", "genre"]),
          });
        
          const registerFormik = useFormik({
            initialValues: {
              username: "", 
              password: "",
              first_name: "",
              last_name: "",
              email:"",
              avatar_sheet:"",
              avatar_frame_index:"",  
            },
            validationSchema: formSchema,
            onSubmit: (values) => {
              register();
                
            },
          });

    const formError = registerError || registerFormik.errors.email || registerFormik.errors.password 
    
    return(
        <div className="register">
            <Header/>
            <div className="register-container">
                    
                    <div className="register-form" onSubmit={registerFormik.handleSubmit}>
                        <h3>Create Account</h3>
                        {formError && <span className='register-form-errors'>{formError}</span>}
                        
                        <input
                        className="register-input"
                        type="email"
                        placeholder="Email"
                        name="Email"
                        value={registerFormik.values.email}
                        onChange={registerFormik.handleChange}
      
                        />

                        {registerFormik.errors.email && <span className='register-form-errors'>{registerFormik.errors.email}</span>}
                        <input
                        className="register-input"
                        type="password"
                        placeholder="Password"
                        name="Password"
                        value={registerFormik.values.password}
                        onChange={registerFormik.handleChange}
                        
                        />
                        {registerFormik.errors.password && <span className='register-form-errors'>{registerFormik.errors.password}</span>}
                        
                        <button className="register-btn" type="submit">Create Account</button>
                        <span>Already Have An Account? Click <NavLink to="/auth/login" className="register-link">Here</NavLink></span>
                    </div>
                </div>
        </div>
    )

}

export default Register;