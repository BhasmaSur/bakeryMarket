import React from 'react'

import PropTypes from 'prop-types'

const PortofolioCard = (props) => {
  return (
    <>
      <div className={`portofolio-card-speaker-card ${props.rootClassName} `}>
        <div className="portofolio-card-image-container">
          <img
            alt={props.imageAlt}
            src={props.imageSrc}
            className="portofolio-card-image"
          />
          <div className="portofolio-card-see-project-container">
            <button className="button-secondary-white button button-md">
              See project
            </button>
          </div>
        </div>
        <span className="portofolio-card-first-name">{props.projectTitle}</span>
      </div>
      <style jsx>
        {`
          .portofolio-card-speaker-card {
            display: flex;
            position: relative;
            align-items: flex-start;
            flex-direction: column;
          }
          .portofolio-card-image-container {
            width: 100%;
            height: 100%;
            display: flex;
            position: relative;
            min-width: 300px;
            max-height: 313px;
            min-height: 313px;
            align-items: flex-end;
            margin-bottom: var(--dl-space-space-unit);
            flex-direction: column;
            justify-content: flex-end;
          }
          .portofolio-card-image {
            left: 0px;
            width: 100%;
            bottom: 0px;
            height: 100%;
            position: absolute;
            object-fit: cover;
            border-radius: var(--dl-radius-radius-radius8);
          }
          .portofolio-card-see-project-container {
            flex: 1;
            width: 100%;
            cursor: pointer;
            display: flex;
            opacity: 0;
            z-index: 1;
            background: linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.6),
                rgba(0, 0, 0, 0.6)
              ),
              url(.jpg);
            transition: 0.3s;
            align-items: center;
            border-radius: var(--dl-radius-radius-radius8);
            flex-direction: row;
            justify-content: center;
          }
          .portofolio-card-see-project-container:hover {
            opacity: 1;
          }
          .portofolio-card-first-name {
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: 23px;
          }
        `}
      </style>
    </>
  )
}

PortofolioCard.defaultProps = {
  rootClassName: '',
  projectTitle: 'Office Life Campaign - Boost your creativity',
  imageAlt: 'image',
  imageSrc:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEwfHxwZW9wbGV8ZW58MHx8fHwxNjQzNzA1NTEx&ixlib=rb-1.2.1&w=300',
}

PortofolioCard.propTypes = {
  rootClassName: PropTypes.string,
  projectTitle: PropTypes.string,
  imageAlt: PropTypes.string,
  imageSrc: PropTypes.string,
}

export default PortofolioCard
