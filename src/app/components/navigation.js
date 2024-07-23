"use client";
import React, { useState } from "react";

import PropTypes from "prop-types";

import NavigationLinks from "./navigation-links";
import Link from "next/link";
import MobileMenu from "./mobile-menu";

const Navigation = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openCartModal, scrollToSection, logo } = props;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const closeMenuAndScroll = (sectionNumber) => {
    closeMenu();
    scrollToSection(sectionNumber);
  };

  const closeMenuAndOpenCart = () =>{
    closeMenu();
    openCartModal();
  }

  return (
    <>
      <header data-role="Header" className="navigation-header">
        <div className="navigation-max-width">
          <img
            alt={logo.altImage}
            src={logo.image_url}
            width={40}
            height={40}
          />
          <div className="navigation-nav">
            <NavigationLinks
              scrollToSection={scrollToSection}
              rootClassName="navigation-links-root-class-name17"
            ></NavigationLinks>
            <button
              onClick={openCartModal}
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
              {props.button}
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className="text-xl focus:outline-none lg:hidden"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        closeMenuAndScroll={closeMenuAndScroll}
        closeMenuAndOpenCart = {closeMenuAndOpenCart}
      />
      <style jsx>
        {`
          .navigation-header {
            top: 0;
            width: 100%;
            display: flex;
            z-index: 100;
            position: fixed;
            align-items: center;
            justify-content: center;
            background-color: var(--dl-color-scheme-white);
          }
          .navigation-max-width {
            width: 100%;
            display: flex;
            max-width: var(--dl-size-size-maxwidth);
            align-items: center;
            padding-top: var(--dl-space-space-twounits);
            padding-left: var(--dl-space-space-oneandhalfunits);
            padding-right: var(--dl-space-space-oneandhalfunits);
            padding-bottom: var(--dl-space-space-twounits);
            justify-content: space-between;
          }
          .navigation-nav {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .navigation-burger-menu {
            display: none;
          }
          .navigation-icon {
            fill: var(--dl-color-scheme-darkblue);
            width: 24px;
            height: 24px;
            display: flex;
          }
          .navigation-nav1 {
            display: flex;
            align-items: flex-start;
            margin-bottom: var(--dl-space-space-oneandhalfunits);
            flex-direction: column;
          }
          .navigation-container {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: var(--dl-space-space-threeunits);
            justify-content: space-between;
          }
          .navigation-close-mobile-menu {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .navigation-icon2 {
            width: 24px;
            height: 24px;
          }
          @media (max-width: 991px) {
            .navigation-nav {
              display: none;
            }
            .navigation-burger-menu {
              display: flex;
            }
          }
          @media (max-width: 767px) {
            .navigation-max-width {
              padding: var(--dl-space-space-unit);
            }
          }
        `}
      </style>
    </>
  );
};

Navigation.defaultProps = {
  imageSrc: "/logo1-1200w.png",
  button: "Cart",
  imageAlt1: "image",
  imageSrc1: "/logo1-1200w.png",
  button2: "Get in touch",
  imageAlt: "logo",
};

Navigation.propTypes = {
  imageSrc: PropTypes.string,
  button: PropTypes.string,
  imageAlt1: PropTypes.string,
  imageSrc1: PropTypes.string,
  button2: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default Navigation;
