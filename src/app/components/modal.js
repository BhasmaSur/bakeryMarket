// components/Modal.js

import { Fragment } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Modal Overlay */}
      <div className="fixed top-12 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-auto">
        {/* Modal Content */}
        <div className="bg-white rounded-lg sm:p-2 sm:w-1/2 w-full h-5/6 sm:h-4/6 overflow-auto">
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
