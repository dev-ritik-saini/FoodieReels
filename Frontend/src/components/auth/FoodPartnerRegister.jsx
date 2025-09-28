import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bname = e.target.businessName.value;
    const name = e.target.name.value;
    const contact = e.target.contact.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/foodPartner/register",
      {
        businessName: bname,
        name,
        email,
        password,
        contact,
        address,
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
          <legend>Partner Sign Up</legend>
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                placeholder="Business Name"
                name="businessName"
                required
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Owner/Manager Name"
                name="name"
                required
              />
            </label>
            <label className="full">
              <input type="email" name="email" placeholder="Email" required />
            </label>
            <label>
              <input
                type="tel"
                name="contact"
                placeholder="Contact Number"
                required
              />
            </label>
            <label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
              />
            </label>
            <label className="full">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </label>
            <button type="submit">Register</button>
          </form>
          <p className="form-footer">
            Already registered? <Link to="/food-partner/login">Login</Link> |{" "}
            <Link to="/user/signup">User Sign Up</Link>
          </p>
        </fieldset>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
