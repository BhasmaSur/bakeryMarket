import React from 'react'

import PropTypes from 'prop-types'

import NavigationLinks from './navigation-links'

const Navigation = (props) => {
  return (
    <>
      <header data-role="Header" className="navigation-header">
        <div className="navigation-max-width">
          <img alt={props.imageAlt} src={props.imageSrc} />
          <div className="navigation-nav">
            <NavigationLinks rootClassName="navigation-links-root-class-name17"></NavigationLinks>
            <button className="button-secondary button button-md">
              {props.button}
            </button>
          </div>
          <div data-role="BurgerMenu" className="navigation-burger-menu">
            <svg viewBox="0 0 1024 1024" className="navigation-icon">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-role="MobileMenu" className="mobile-menu">
            <div className="navigation-nav1">
              <div className="navigation-container">
                <img alt={props.imageAlt1} src={props.imageSrc1} />
                <div
                  data-role="CloseMobileMenu"
                  className="navigation-close-mobile-menu"
                >
                  <svg viewBox="0 0 1024 1024" className="navigation-icon2">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <NavigationLinks rootClassName="navigation-links-root-class-name18"></NavigationLinks>
              <button className="button-secondary button button-md">
                {props.button2}
              </button>
            </div>
          </div>
        </div>
      </header>
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
  )
}

Navigation.defaultProps = {
  imageSrc: '/logo1-1200w.png',
  button: 'Get in touch',
  imageAlt1: 'image',
  imageSrc1: '/logo1-1200w.png',
  button2: 'Get in touch',
  imageAlt: 'logo',
}

Navigation.propTypes = {
  imageSrc: PropTypes.string,
  button: PropTypes.string,
  imageAlt1: PropTypes.string,
  imageSrc1: PropTypes.string,
  button2: PropTypes.string,
  imageAlt: PropTypes.string,
}

export default Navigation
