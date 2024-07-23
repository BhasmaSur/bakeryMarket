import React from "react";

import PropTypes from "prop-types";
import Link from "next/link";

const NavigationLinks = (props) => {
  const { scrollToSection } = props;
  return (
    <>
      <nav className={`navigation-links-nav ${props.rootClassName} `}>
        <span
          onClick={() => scrollToSection(1)}
          className="navigation-links-text Navigation-Link"
        >
          {props.link1}
        </span>
        <span
          onClick={() => scrollToSection(2)}
          className="navigation-links-text1 Navigation-Link"
        >
          {props.link2}
        </span>
        <span
          onClick={() => scrollToSection(3)}
          className="navigation-links-text2 Navigation-Link"
        >
          {props.link3}
        </span>
        <span
          onClick={() => scrollToSection(4)}
          className="navigation-links-text3 Navigation-Link"
        >
          {props.link4}
        </span>
      </nav>
      <style jsx>
        {`
          .navigation-links-nav {
            flex: 0 0 auto;
            display: flex;
            align-items: center;
            flex-direction: row;
          }
          .navigation-links-text {
            cursor: pointer;
            transition: 0.3s;
          }
          .navigation-links-text:hover {
            color: var(--dl-color-scheme-brown);
          }
          .navigation-links-text1 {
            cursor: pointer;
            transition: 0.3s;
            margin-left: 41px;
          }
          .navigation-links-text1:hover {
            color: var(--dl-color-scheme-brown);
          }
          .navigation-links-text2 {
            cursor: pointer;
            transition: 0.3s;
            margin-left: 41px;
          }
          .navigation-links-text2:hover {
            color: var(--dl-color-scheme-brown);
          }
          .navigation-links-text3 {
            cursor: pointer;
            transition: 0.3s;
            margin-left: 41px;
          }
          .navigation-links-text3:hover {
            color: var(--dl-color-scheme-brown);
          }

          .navigation-links-root-class-name17 {
            margin-right: var(--dl-space-space-threeunits);
          }
          @media (max-width: 767px) {
            .navigation-links-nav {
              align-items: flex-start;
              flex-direction: column;
            }
            .navigation-links-text {
              margin-bottom: var(--dl-space-space-unit);
            }
            .navigation-links-text1 {
              margin-left: 0;
              margin-bottom: var(--dl-space-space-unit);
            }
            .navigation-links-text2 {
              margin-left: 0;
              margin-bottom: var(--dl-space-space-unit);
            }
            .navigation-links-text3 {
              margin-left: 0;
              margin-bottom: var(--dl-space-space-unit);
            }
          }
        `}
      </style>
    </>
  );
};

NavigationLinks.defaultProps = {
  link3: "Menu",
  rootClassName: "",
  link2: "About",
  link4: "Contact Us",
  link1: "Home",
};

NavigationLinks.propTypes = {
  link3: PropTypes.string,
  rootClassName: PropTypes.string,
  link2: PropTypes.string,
  link4: PropTypes.string,
  link1: PropTypes.string,
};

export default NavigationLinks;
