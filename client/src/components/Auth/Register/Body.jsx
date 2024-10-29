import React, { useState, useRef } from "react";
import Button from "../../partials/Button";
import Input from "../../partials/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Body = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const passwordRef = useRef(null);

  const registerUser = async (e) => {
    e.preventDefault();
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(`${API_URL}/register`, {
        fullName,
        email,
        password,
      });
      setFullName("");
      setEmail("");
      passwordRef.current.value = "";
      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <main className="h-[80vh] flex flex-col items-center justify-center">
        <form
          className="flex flex-col items-center gap-2 p-16 w-[20vw] border rounded-lg text-gray-700"
          onSubmit={registerUser}
        >
          <h3 className="text-2xl font-semibold mb-5">Please Register</h3>

          <div className="flex flex-col">
            <label htmlFor="fullName" className="mb-1">
              Full Name
            </label>
            <Input
              placeholder="Enter your Full Name"
              id="fullName"
              required={true}
              onChange={(e) => setFullName(e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <Input
              placeholder="Enter your Email"
              id="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your Password"
              id="password"
              required={true}
              ref={passwordRef}
            ></Input>
          </div>
          <Button className="mt-3 w-32" type="submit" variant="primary">
            Sign Up
          </Button>
          <p>
            Already have an account?{" "}
            <Link className="text-cyan-700 opacity-60" to="/login">
              Log In Now
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default Body;