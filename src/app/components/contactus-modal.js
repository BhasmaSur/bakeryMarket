"use client";
import React, { useEffect, useMemo, useState } from "react";
import { sendEmail } from "@/utility/emailService";

const ContactModal = ({ closeModal, shopName }) => {
  const [username, setUsername] = useState();
  const [contactDetail, setContactDetail] = useState();
  const [message, setMessage] = useState();

  const mailToShop = () => {
    if (username && contactDetail) {
      const emailPayload = {
        shop_name: shopName,
        message: message,
        from_name: username,
        reply_to: contactDetail,
      };
      sendEmail(emailPayload).then((emailRes) => {
        if (emailRes) {
          alert("Your Message is sent to the admin, we will contact you soon");
          closeModal();
        }
      });
    } else {
      alert("Please fill contact details");
    }
  };

  return (
    <>
      <div className="ml-10 mr-10 sm:mt-0 overflow-auto">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Contact Details
          </h3>
          <button
            onClick={closeModal}
            type="button"
            class="xs:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div className="mt-10">
          <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2 mt-10">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  Address :
                </h3>
                <div className="mt-5 text-left">
                  RH 15,Edenn Garden, Wakad, Pimpri-Chinchwad, Maharashtra
                  411057
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white mt-10">
                    Phone Number : 083296 40374
                  </h3>
                </div>
              </div>
              <div>
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="mt-5">
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Details (mobile/email)
                  </label>
                  <input
                    onChange={(e) => setContactDetail(e.target.value)}
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="XXXXXXXXXX"
                    required
                  />
                </div>
                <div className="mt-5">
                  <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Message/Instructions
                  </label>
                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="I need it in two days...."
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="text-right mb-10">
          <button
            onClick={mailToShop}
            class="px-2 py-0.5 sm:px-4 sm:py-2 mt-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Send Email
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
