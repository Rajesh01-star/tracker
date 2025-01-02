"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

function Login({ changeToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false); // Alert visibility state
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state

  function btnClickHandler(e) {
    e.preventDefault();
    console.log("Btn clicked");
  }

  return (
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Background Blob */}
      <div className="absolute inset-0">
        <Image
          className="absolute right-0 w-[60%]"
          src="/blob-haikei.svg"
          alt="Background blob"
          width={500}
          height={500}
        />
      </div>

      {/* Sign-Up Form */}
      <div className="relative flex justify-center items-center h-screen z-20">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">Log in</h2>

          {alertVisible && (
            <Alert variant="destructive" className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={(e) => btnClickHandler(e)}>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              Log in
            </button>
          </form>

          {/* Toggle Login Mode Button */}
          <div className="mt-4 text-center">
            <button
              className="text-indigo-600 hover:underline"
              onClick={() => changeToSignUp("signup")}
            >
              Have an account? sign up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
