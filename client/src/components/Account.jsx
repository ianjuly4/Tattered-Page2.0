import React, { useContext } from "react";
import Header from "./Header";
import { MyContext } from "../MyContext";
import { useFormik } from "formik";
import * as yup from 'yup';

const Account = () => {
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
        <div className="account">
            <Header/>
            {user? <div className="account-container" >
                <h2>WELCOME BACK,{}</h2>
                <div className="account-pic">
                    <img src="/default-avatar.png" alt="Profile" />
                </div>
                <button className="account-pic-button">EDIT</button>

                <div className="form-grid">
                        <div className="info-block">
                            <div className="info-text">
                                <span className="label"> Username</span>
                                <span className="value"></span>
                            </div>
                            <button className="info-edit-btn">Edit Username</button>
                        </div>
                        <div className="info-block">
                            <div className="info-text">
                                <span className="label">Password</span>
                                <span className="value"></span>
                            </div>
                            <button className="info-edit-btn">Edit Password</button>
                        </div>
                        <div className="info-block">
                            <div className="info-text">
                                <span className="label">Email</span>
                                <span className="value"></span>
                            </div>
                            <button className="info-edit-btn">Edit Email</button>
                        </div>
                        <div className="info-block">
                            <div className="info-text">
                                <span className="label">Number Of Books In Library</span>
                                <span className="value"></span>
                            </div>
                            
                        </div>
                         <div className="info-block">
                            <div className="info-text">
                                <span className="label"> First Name</span>
                                <span className="value"></span>
                            </div>
                            <button className="info-edit-btn">Edit First Name</button>
                        </div>
                        <div className="info-block">
                            <div className="info-text">
                                <span className="label"> Last Name</span>
                                <span className="value"></span>
                            </div>
                            <button className="info-edit-btn">Edit Last Name</button>
                        </div>
                </div>
                        
             

            </div>:
            <div className="account-login">
                <h2>Please Login or Create An Account</h2>
                <div className="account-login-form">
                    <input
                    type="text"
                    placeholder="Username"
                    value={formik.values.Username}
                    onChange={formik.handleChange}
                    name="Username"
                    />
                    <input
                    type="text"
                    placeholder="Password"
                    value={formik.values.Password}
                    onChange={formik.handleChange}
                    name="Password"
                    />
                <button type="submit">Login</button>
                </div>
            </div>}
        </div>
    )
}
export default Account;