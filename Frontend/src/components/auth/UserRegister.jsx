import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fname = e.target.firstName.value;
    const lname = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      {
        fullName: fname + " " + lname,
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    console.log(response.data.user);

    navigate("/home");
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <fieldset>
          <legend>User Sign Up</legend>
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                required
              />
            </label>
            <label>
              <input type="text" placeholder="Last Name" name="lastName" />
            </label>
            <label className="full">
              <input type="email" name="email" placeholder="Email" required />
            </label>
            <label className="full">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
          <p className="form-footer">
            Already have an account? <Link to="/user/login">Login</Link> |{" "}
            <Link to="/food-partner/signup">Register as Partner</Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default UserRegister;
