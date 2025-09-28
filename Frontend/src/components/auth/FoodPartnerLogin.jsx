import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/foodPartner/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    const next = response?.data?.next || "/profile";
    navigate(next);
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <fieldset>
          <legend>Partner Login</legend>
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
            <button type="submit">Login</button>
          </form>
          <p className="form-footer">
            New partner? <Link to="/food-partner/signup">Create account</Link> |{" "}
            <Link to="/user/login"> User Login</Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
