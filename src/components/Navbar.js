import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { Link, NavLink, useLocation } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPageTop, setIsPageTop] = useState(true);

  const ref = useRef();
  const refButton = useRef();

  useOnClickOutside(ref, () => setIsDropdownOpen(false), refButton);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY === 0) setIsPageTop(true);
      else setIsPageTop(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <>
      <nav
        className={`${
          location.pathname === "/search"
            ? "navbar__solid"
            : !isPageTop
            ? "navbar__solid"
            : ""
        } navbar py-4 text-white fixed w-full z-50`}
        style={{ fontSize: "14px" }}
      >
        <div className="flex justify-between items-center container mx-auto">
          <div className="flex space-x-5 md:space-x-10 items-center">
            <Link to="/">
              <img
                src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
                alt="Netflix logo"
                className="w-20 md:w-24"
              />
            </Link>
            <ul className="space-x-4 hidden md:flex">
              <li className="">
                <NavLink to="/" exact activeClassName="font-bold">
                  Inicio
                </NavLink>
              </li>
              <li className="cursor-no-drop hover:text-gray-300">
                Proximamente
              </li>
            </ul>
            <ul className="block md:hidden">
              <li className="relative" id="dropdown">
                <div
                  ref={refButton}
                  className="flex items-center cursor-pointer hover:text-gray-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <p>Explorar</p>
                  {isDropdownOpen ? (
                    <ArrowDropUpIcon></ArrowDropUpIcon>
                  ) : (
                    <ArrowDropDownIcon></ArrowDropDownIcon>
                  )}
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute border border-white rounded-md"
                    style={{ top: "2rem", backgroundColor: "#141414" }}
                    ref={ref}
                  >
                    <p className="px-3 py-2 cursor-pointer hover:text-gray-300">
                      Inicio
                    </p>
                    <p className="px-3 py-2 hover:text-gray-300 cursor-no-drop">
                      Proximamente
                    </p>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink to="/search">
              <SearchIcon className="text-white hover:text-gray-300 cursor-pointer"></SearchIcon>
            </NavLink>
            <Avatar sx={{ width: 30, height: 30 }} variant="rounded"></Avatar>
          </div>
        </div>
      </nav>
      {location.pathname === "/search" && <div className="py-8"></div>}
    </>
  );
};

export default Navbar;
