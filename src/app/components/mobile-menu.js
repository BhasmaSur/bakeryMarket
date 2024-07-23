// components/MobileMenu.js

import { Fragment } from "react";

const MobileMenu = ({
  isOpen,
  onClose,
  closeMenuAndScroll,
  closeMenuAndOpenCart,
}) => {
  return (
    <Fragment>
      {/* Background overlay */}
      <div
        className={`fixed inset-0 bg-black opacity-50 z-50 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      ></div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-lg ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <span className="text-xl font-bold">Menu</span>
          <button
            onClick={onClose}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li
              onClick={() => closeMenuAndScroll(1)}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => closeMenuAndScroll(2)}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => closeMenuAndScroll(3)}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            >
              Menu
            </li>
            <li
              onClick={() => closeMenuAndScroll(4)}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
            >
              Contact Us
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
              <button
                onClick={closeMenuAndOpenCart}
                className="button-secondary button button-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="file: mt-4 h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                Cart
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default MobileMenu;
