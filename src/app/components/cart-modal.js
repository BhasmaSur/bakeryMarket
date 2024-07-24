"use client";
import React, { useEffect, useMemo, useState } from "react";
import VariantBox from "./variantBox";
import { sendEmail } from "@/utility/emailService";

const CartModal = ({
  cartData = [],
  bakeryDetail = [],
  closeModal,
  shopName,
}) => {
  const [filteredCartData, setFilteredCartData] = useState([]);
  const [username, setUsername] = useState();
  const [contactDetail, setContactDetail] = useState();
  const [message, setMessage] = useState();
  useEffect(() => {
    const filledCart = cartData.map((cartItem) => {
      const bakeryItemList = bakeryDetail.products.filter(
        (item) => item.id === cartItem.productId
      );
      const currentVariantList = bakeryItemList
        .at(0)
        .variants.filter((variant) => variant.id === cartItem.variantId);
      const currentVariant = currentVariantList.at(0);
      return {
        ...bakeryItemList.at(0),
        variant: {
          ...currentVariant,
          quantity: cartItem.quantity,
        },
        total: currentVariant.price * cartItem.quantity,
      };
    });
    setFilteredCartData([...filledCart]);
  }, [cartData, bakeryDetail]);

  const calculateTotal = useMemo(() => {
    let total = 0;
    filteredCartData.forEach((cartItem) => {
      total = total + cartItem.total;
    });
    return total;
  }, [filteredCartData]);

  const mailToShop = () => {
    if (username && contactDetail) {
      let orderInfo = `Order Placed By : ${username}\n`;
      let orderContactdetail = `Conatact Detail : ${contactDetail}\n\n`
      let orderDetails = "Order Details : \n\n\n";
      filteredCartData.forEach((cartItem) => {
        const order = `Product Id : ${cartItem.id}\n
                       Product Name : ${cartItem.name}\n
                       Product Category : ${cartItem.category}\n  
                       Sub Category : ${cartItem.sub_category}\n
                       Size : ${cartItem.variant.size} ${cartItem.variant.unit}\n
                       Quantity : ${cartItem.variant.quantity}\n
                       Price : ${cartItem.variant.price}\n\n\n`;
        orderDetails = orderDetails + order;
      });

      orderInfo =
        orderInfo +
        orderContactdetail +
        orderDetails +
        "Grand Total : " +
        calculateTotal +
        "\n\nInstruction by customer : " +
        message;
      const emailPayload = {
        shop_name: shopName,
        message: orderInfo,
        from_name: username,
        reply_to: contactDetail,
      };
      sendEmail(emailPayload).then((emailRes) => {
        if (emailRes) {
          alert("Your Message is sent to the admin, we will contact you soon");
          closeModal()
        }
      });
    } else {
      alert("Please fill delivery details");
    }
  };

  return (
    <>
      <div className="ml-10 mr-10 sm:mt-0 overflow-auto">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Items Added In Cart
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
        {filteredCartData &&
          filteredCartData.map((cartItem) => {
            return (
              <div class="grid grid-cols-3 overflow-auto block mb-2 p-1 sm:p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="mt-2">
                  <img
                    class="w-20 h-20 sm:w-40 sm:h-40 rounded-xl object-center"
                    src={cartItem.pic_url}
                    alt=""
                  />
                </div>
                <div className="text-left col-span-2 sm:col-span-1">
                  {" "}
                  <div className="font-bold mt-2 ">{cartItem.name}</div>
                  <h6 className="sm:mt-2 text-xs sm:text-sm">
                    {cartItem.ingrediants}
                  </h6>
                  <h5 className="font-bold sm:mt-2 text-sm">
                    {cartItem.variant.size} {cartItem.variant.unit}(s)
                  </h5>
                  <h5 className="font-bold mt-2">₹{cartItem.variant.price}</h5>
                  <div className="text-left sm:text-right font-bold visible sm:invisible">
                    Quantity : {cartItem.variant.quantity}
                    <div className="text-left sm:text-right">
                      Total : {cartItem.total}
                    </div>
                  </div>
                </div>
                <div className="text-right font-bold invisible sm:visible">
                  Quantity : {cartItem.variant.quantity}
                  <div className="text-right">Total : {cartItem.total}</div>
                </div>
              </div>
            );
          })}
        <div className="mt-10">
          <div className="text-center">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Delivery Details
            </h3>
          </div>
          <form>
            <div class="grid gap-6 mb-6 md:grid-cols-2 mt-10">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">
                  Bill Details
                </h3>
                <div className="mt-10 text-left">
                  {filteredCartData.map((cartItem) => {
                    return (
                      <div>
                        {cartItem.variant.size} {cartItem.variant.unit}(s) * ₹
                        {cartItem.variant.price} = ₹{cartItem.total}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white mt-10">
                    Grand Total : {calculateTotal}
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
            CheckOut
          </button>
        </div>
      </div>
    </>
  );
};

export default CartModal;
