import React, { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold text-indigo-600">SyncSpace</div>
            <nav className="hidden md:flex ml-8 space-x-4">
              <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
              <a href="/rooms" className="text-gray-700 hover:text-indigo-600">Rooms</a>
              <a href="/about" className="text-gray-700 hover:text-indigo-600">About</a>
            </nav>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center">
            <div className="hidden md:flex space-x-3">
              <button className="px-4 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700">
                New Room
              </button>
              <button className="px-4 py-1 rounded-md text-sm border border-gray-200 hover:bg-gray-50">
                Sign in
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <button
                onClick={() => setOpen(prev => !prev)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
                aria-expanded={open}
                aria-label="Toggle menu"
              >
                {/* simple hamburger / X icon */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Home</a>
            <a href="/rooms" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Rooms</a>
            <a href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">About</a>
            <div className="border-t border-gray-100 mt-2 pt-2 px-3">
              <button className="w-full text-left px-3 py-2 rounded-md bg-indigo-600 text-white">New Room</button>
              <button className="w-full text-left mt-2 px-3 py-2 rounded-md border border-gray-200">Sign in</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
