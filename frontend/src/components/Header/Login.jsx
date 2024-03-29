import React, { useEffect, useState } from "react";
import module from "./Header.module.css";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

import axios from "../../axios.js";

const Login = ({ togglePopup, popupRef, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const signIn = useSignIn();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    console.log("Submitting username:", username);
    console.log("Submitting password:", password);

    axios
      .post("/api/token/", { username: username, password: password })
      .then((response) => {
        console.log(response)
        axios.get("/user/", {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        })
        .then((userResponse) => {
          // console.log(userResponse.data);
          setUser(userResponse.data)
        })
        .catch((error) => {
          setError(error.response?.data.message);
        });

        console.log(response);
        signIn({
          auth: {
            token: response.data.access,
            type: "Bearer",
          },
        });
        // Выполняем запрос к /user после успешной аутентификации
        
      })
      .catch((error) => {
        setError(error.response?.data.message);
      });

    setUsername("");
    setPassword("");

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
