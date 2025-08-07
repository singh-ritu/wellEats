"use client";
import React from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/app/Lib/firebase";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setEmail("");
    setPassword("");
    setError(null);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const method = isLogin
        ? signInWithEmailAndPassword
        : createUserWithEmailAndPassword;
      const result = await method(auth, email, password);
      console.log(result.user);
    } catch (error) {
      setError(error.message);
    }

    console.log("submitted");
  };
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {isLogin ? "Login" : "SignUp"}
      </h2>
      <form onSubmit={handleSubmit}>
        <InputField
          type={"email"}
          placeholder={"Enter your email"}
          value={email}
          onChange={e => setEmail(e.taregt.value)}
        />
        <InputField
          type={"password"}
          placeholder={"Enter your password"}
          value={password}
          onChange={e => setPassword(e.taregt.value)}
        />
        <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>

        <Button
          onClick={handleGoogleLogin}
          className="mt-4 bg-red-500 hover:bg-red-600">
          Continue with Google
        </Button>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <p className="mt-6 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account"}
          <Button
            onClick={toggleMode}
            className="text-blue-600 hover:underline font-medium">
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </p>
      </form>
    </div>
  );
}

export default AuthForm;
