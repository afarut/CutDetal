import React, { useState } from "react";
import module from "./Header.module.css";
import useSignIn from 'react-auth-kit/hooks/useSignIn'

import axios from '../../axios.js'

const Login = ({ togglePopup, popupRef, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const signIn = useSignIn()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    console.log("Submitting username:", username);
    console.log("Submitting password:", password);
    console.log("Remember me:", rememberMe);

    axios
      .post("/api/token/", { username: username, password: password }, { withCredentials: true })
      .then((response) => {
        console.log(response)
        signIn({
          auth: {
            token: response.data.access,
            type: 'Bearer'
          },
          refresh: response.data.refresh,
        })
      })
      .catch((error) => {
        setError(error.response?.data.message);
      });

    setUsername("");
    setPassword("");

    // setUser({ isAdmin: true, isSuperAdmin: true });
    togglePopup();
  };

  return (
    <div
      ref={popupRef}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 w-[50%] rounded-xl"
    >
      <form
        onSubmit={handleSubmit}
        className={`pt-[8px] ${module.formWrapper}`}
      >
        <div>
          <label htmlFor="username text-[16px]">Login</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="border border-gray-300 p-2 mb-4 w-full rounded-xl"
          />
        </div>
        <div>
          <label htmlFor="password text-[16px]">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 p-2 mb-4 w-full rounded-xl"
          />
        </div>
        <div className="flex flex-col ">
          <div className="mb-4">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
              className="mr-2"
            />
            <label
              htmlFor="rememberMe"
              className="!text-[14px] lg:!text-[18px]"
            >
              Remember me for 14 days
            </label>
          </div>
          <div className="flex justify-center lg:justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
      <div onClick={togglePopup} className="absolute top-[15px] right-[15px]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.61578 2.19485L32.5388 33.1178M1.61578 33.1178L32.5388 2.19485"
            stroke="#FF6161"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Login;
