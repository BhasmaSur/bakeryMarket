import React from 'react'

import PropTypes from 'prop-types'

const ServicesCard = ({imageAlt, imageSrc, text, text1, text2}) => {
  return (
    <>
      <div className="services-card">
        <div className="services-card-container">
          <img
            alt={imageAlt}
            src={imageSrc}
            className="services-card-image"
          />
        </div>
        <span className="services-card-text">{text}</span>
        <span className="services-card-text1">{text1}</span>
        <span className="services-card-text2">{text2}</span>
      </div>
      <style jsx>
        {`
          .services-card-container {
            width: 56px;
            height: 56px;
            display: flex;
            align-items: center;
            border-radius: var(--dl-radius-radius-radius4);
            margin-bottom: var(--dl-space-space-twounits);
            justify-content: center;
            background-color: rgba(182, 71, 47, 0.1);
          }
          .services-card-image {
            width: 24px;
            height: 24px;
            object-fit: contain;
          }
          .services-card-text {
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .services-card-text1 {
            margin-bottom: var(--dl-space-space-oneandhalfunits);
          }
          .services-card-text2 {
            cursor: pointer;
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}

ServicesCard.defaultProps = {
  imageAlt: 'image',
  imageSrc: '/website-200h.png',
  text: 'Website design',
  text1:
    'Create your ubest unique App development, crafted for your business needs.',
  text2: 'Learn more',
}

ServicesCard.propTypes = {
  imageAlt: PropTypes.string,
  imageSrc: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
}

export default ServicesCard
