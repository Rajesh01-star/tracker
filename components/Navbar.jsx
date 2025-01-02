"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white z-30">
      <div className="max-w-7xl mx-auto z-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold">MyWebLink</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link href="/">
              <span className="hover:text-gray-300">Home</span>
            </Link>
            <Link href="/products">
              <span className="hover:text-gray-300">Products</span>
            </Link>
            <Link href="/about">
              <span className="hover:text-gray-300">About Us</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <span className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                Home
              </span>
            </Link>
            <Link href="/products">
              <span className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                Products
              </span>
            </Link>
            <Link href="/about">
              <span className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">
                About Us
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
