import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    navigate("/home");
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <fieldset>
          <legend>User Login</legend>
          <form className="form-grid" onSubmit={handleSubmit}>
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
            <button type="submit">Log in</button>
          </form>
          <p className="form-footer">
            New here? <Link to="/user/signup">Create account</Link> |{" "}
            <Link to="/food-partner/login">Partner Login</Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default UserLogin;
