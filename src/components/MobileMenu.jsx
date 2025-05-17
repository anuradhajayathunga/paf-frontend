"use client";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <div onClick={() => setIsOpen((prev) => !prev)}>
        <div className="flex flex-col gap-[4.5px] cursor-pointer">
          <div
            className={`w-6 h-1 bg-blue-500 rounded-sm ${
              isOpen ? "rotate-45" : ""
            } origin-left ease-in-out duration-500`}
          />
          <div
            className={`w-6 h-1 bg-blue-500 rounded-sm ${
              isOpen ? "opacity-0" : ""
            } ease-in-out duration-500`}
          />
          <div
            className={`w-6 h-1 bg-blue-500 rounded-sm ${
              isOpen ? "-rotate-45" : ""
            } origin-left ease-in-out duration-500`}
          />
        </div>
        {/* Menu Overlay */}
        {isOpen && (
          <div className="fixed left-0 top-20 w-full h-[calc(100vh-2rem)] p-6 bg-blue-100/60 backdrop-blur-md flex flex-col items-center justify-center gap-8 font-medium text-lg text-slate-800 z-50">
            <Link
              to="/"
              className="w-full text-center rounded-md px-4 py-2 hover:bg-white/20 hover:text-blue-800 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/"
              className="w-full text-center rounded-md px-4 py-2 hover:bg-white/20 hover:text-blue-800 transition duration-200"
            >
              Friends
            </Link>
            <Link
              to="/courses"
              className="w-full text-center rounded-md px-4 py-2 hover:bg-white/20 hover:text-blue-800 transition duration-200"
            >
              Courses
            </Link>
            <Link
              to="/"
              className="w-full text-center rounded-md px-4 py-2 hover:bg-white/20 hover:text-blue-800 transition duration-200"
            >
              Stories
            </Link>
            <hr className="border-t border-blue-200 w-4/5" />
            <Link
              to="/"
              className="w-full text-center rounded-md px-4 py-2 hover:bg-white/20 hover:text-blue-800 transition duration-200"
              onClick={closeMenu}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
