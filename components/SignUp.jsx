"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useRouter } from "next/navigation";

function SignUp({ changeToLogin }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false); // Alert visibility state
  const [alertMessage, setAlertMessage] = useState(""); // Alert message state

  console.log(process.env.NEXT_PUBLIC_Firebasekey)
  async function btnClickHandler(e) {
    e.preventDefault();

    if (confirmedPassword !== password) {
      setAlertMessage("Passwords don't match!");
      setAlertVisible(true);
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.NEXT_PUBLIC_Firebasekey}`,
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

      if (response.ok) {
        router.push("/Welcome");
      } else {
        const data = await response.json();
        setAlertMessage(`Error: ${data.error.message}`);
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage(`Error: ${error.message}`);
      setAlertVisible(true);
    }
  }

  return (
    <section className="relative min-h-screen bg-gray-100 overflow-hidden">
      {/* Background Blob */}
      <div className="absolute inset-0 z-10">
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
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
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

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                required
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setConfirmedPassword(e.target.value);
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >
              Sign Up
            </button>
          </form>

          {/* Login Button */}
          <div className="mt-4 text-center">
            <button
              className="text-indigo-600 hover:underline"
              onClick={() => changeToLogin("login")}
            >
              Have an account? Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
