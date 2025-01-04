"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';
import { useRouter } from "next/navigation";

function Login({ changeToSignUp }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  async function btnClickHandler(e) {
    e.preventDefault();
    console.log("Btn clicked");

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_Firebasekey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("idToken", result.idToken);
      
        router.push("/Welcome");
      } else {
        setAlertMessage(`Error: ${result.error.message}`);
        setAlertVisible(true);
      }
    } catch (err) {
      console.error("Login error:", err);
      setAlertMessage("An unexpected error occurred. Please try again.");
      setAlertVisible(true);
    }
  }

  return (
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          className="absolute right-0 w-[60%]"
          src="/blob-haikei.svg"
          alt="Background blob"
          width={500}
          height={500}
        />
      </div>

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

          <form onSubmit={(e) => btnClickHandler(e)} aria-label="Login form">
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
                autoComplete="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

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
                autoComplete="current-password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              Log in
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              className="text-indigo-600 hover:underline"
              onClick={() => changeToSignUp("signup")}
            >
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

