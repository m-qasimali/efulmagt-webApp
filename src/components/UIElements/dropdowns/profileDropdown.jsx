import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/dashboard/logo.png";
import { useNavigate } from "react-router-dom";
import { useCredentials } from "../../../context/CrendentialsContext";
const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useCredentials();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  
  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && menuRef.current && !menuRef.current.contains(event.target) ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left shadow rounded-full bg-white">
      <div
        onClick={toggleDropdown}
        ref={dropdownRef}
        className="flex items-center justify-center cursor-pointer h-[66px] px-4"
      >
        {
          credentials.selected=="user"?
          <img
            src={credentials.user.image || ""}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />:
          <img
            src={credentials.company.image || ""}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        }
        {
          credentials.selected=="user"?
          <span className="ml-2 text-base font-semibold hidden lg:inline">{credentials.user.name.firstName + " " + credentials.user.name.lastName}</span>:
          <span className="ml-2 text-base font-semibold hidden lg:inline">{credentials.company.companyName}</span>
        }
          <svg
          className="ml-2 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        
      </div>

      {isOpen && (
        <div ref={menuRef} className="absolute z-40 right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {
            credentials.selected == "user"?
            (credentials.company &&
            <button onClick={()=>{
                setCredentials((oldValues)=>{
                  return {
                    ...oldValues, 
                    selected: "company"
                  }
                })

                setIsOpen(false);
              }} className="flex w-full items-center my-2">
                <img
                  src={credentials.company.image}
                  alt="Email 1"
                  className="w-6 h-6 rounded-full"
                />
                <p className="ml-2 text-sm text-gray-500">{credentials.company.companyName}</p>
              </button>):
              <button onClick={()=>{
                setCredentials((oldValues)=>{
                  return {
                    ...oldValues, 
                    selected: "user"
                  }
                })

                setIsOpen(false);
              }}
              className="flex w-full items-center my-2">
              <img
                src={credentials.user.image}
                alt="Email 1"
                className="w-6 h-6 rounded-full"
              />
              <p className="ml-2 text-sm text-gray-500">{credentials.user.name.firstName + " " + credentials.user.name.lastName}</p>
            </button>
            }
            <div
              onClick={()=>{setCredentials(null); navigate("/signin")}}
              className="block py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
              role="menuitem"
            >
              Sign out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;