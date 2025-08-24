import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg shadow-indigo-300 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="text-xl font-bold text-indigo-600 ">SyncSpace</div>
            <nav className="hidden md:flex ml-8 space-x-4 w-full h-full ">
              <Link to="/" className="text-gray-700 hover:text-indigo-600">
                Home
              </Link>
              <Link to="/rooms" className="text-gray-700 hover:text-indigo-600">
                Rooms
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-indigo-600">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex space-x-3">
              <Link to="/NewRoom">
                <button className="px-4 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-[0_0_20px_5px_rgba(99,102,241,0.7)]">
                  New Room
                </button>
              </Link>
              <Link to="/SignIn">
                <button className="px-4 py-1 rounded-md text-sm border border-gray-200 hover:bg-gray-50 hover:shadow-[0_0_20px_5px_rgba(99,102,241,0.7)]">
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
