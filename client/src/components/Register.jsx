import React, { useContext } from "react";
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from "yup";
import Header from "./Header";
import { NavLink } from "react-router-dom";

const Register = () => {
  const { register, registerError } = useContext(MyContext);

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter an email").max(25),
    password: yup.string().required("Must enter a password").max(25),
  });

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      register(values.email, values.password);
    },
  });

  return (
    <div className="register">
      <Header />
      <div className="register-container">
        <form className="register-form" onSubmit={registerFormik.handleSubmit}>
          <h3>Create Account</h3>

          {/* Global form error from API */}
          {registerError && <span className="register-form-errors">{registerError}</span>}

          <input
            className="register-input"
            type="email"
            placeholder="Email"
            name="email"
            value={registerFormik.values.email}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
          />
          {registerFormik.touched.email && registerFormik.errors.email && (
            <span className="register-form-errors">{registerFormik.errors.email}</span>
          )}

          <input
            className="register-input"
            type="password"
            placeholder="Password"
            name="password"
            value={registerFormik.values.password}
            onChange={registerFormik.handleChange}
            onBlur={registerFormik.handleBlur}
          />
          {registerFormik.touched.password && registerFormik.errors.password && (
            <span className="register-form-errors">{registerFormik.errors.password}</span>
          )}

          <button className="register-btn" type="submit">
            Create Account
          </button>

          <span>
            Already Have An Account? Click{" "}
            <NavLink to="/auth/login" className="register-link">
              Here
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;