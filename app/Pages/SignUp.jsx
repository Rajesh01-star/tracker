import React from "react";
import Image from "next/image";

function SignUp() {
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
          <form>
            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                type="password"
                id="password"
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
            <button className="text-indigo-600 hover:underline">
              Have an account? Login
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
