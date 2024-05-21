import React, { useState } from "react";
import './RegistrationForm.css';
import { FaUser, FaLock, FaUnlock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiNewspaperLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleContinue = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const checkbox = document.querySelector(".policy-checkbox");
    if (!checkbox.checked) {
      const termsPolicyText = document.querySelector(".policy-text");
      termsPolicyText.style.color = "rgb(0, 255, 185)";
      return;
    }

    // Constructing the request body
    const requestBody = {
      firstName,
      lastName,
      email,
      password,
      aadharNo
    };

    try {
      // Making the REST call
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      // Handling the response
      if (response.ok) {
        const message = await response.text();
        toast.success(message, {
          position: "top-center"
        });
      } else {
        const message = await response.text();
        toast.error(message, {
          position: "top-center"
        });
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="wrapper-register">
      <form onSubmit={handleContinue}>
        <h1>Create an account</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="FirstName"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="LastName"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="UserEmail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input
            type="number"
            placeholder="AadharNo"
            required
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
          />
          <RiNewspaperLine className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaUnlock className="icon" />
        </div>
        <div className="terms-and-conditions">
          <label className="terms-checkbox">
            <input className="policy-checkbox" type="checkbox" />
            <p className="policy-text"> I accept the Terms of Use & Privacy Policy</p>
          </label>
        </div>
        <button type="submit">Sign Up</button>
        <div className="register-link">
          <p>
            Already have an account? <a href="http://localhost:3000/login">Login Here</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
