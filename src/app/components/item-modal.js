"use client";
import React, { useState } from "react";
import VariantBox from "./variantBox";

const ItemModal = ({
  cartData,
  itemSelected,
  closeModal,
  addDataToCart,
}) => {
  const calcluteQuantityOfVariant = (variant) => {
    const variantInCart = cartData.filter((cartItem) => {
      return (
        cartItem.productId === itemSelected.id &&
        cartItem.variantId === variant.id
      );
    });
    if (variantInCart.length > 0) {
      return variantInCart.at(0).quantity;
    }
    return 0;
  };
  // const { title, itemPara, features, imageLocation } = selectedCategoryDetails;
  return (
    <>
      <div className="ml-10 mr-10 sm:mt-0 overflow-auto">
        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Variants
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
        <div class="grid sm:grid-cols-2 overflow-auto">
          <div className="m-2">
            <img
              class="w-60 h-60 sm:w-80 sm:h-80 rounded-xl object-center"
              src={itemSelected.pic_url}
              alt=""
            />
            <h5 className="font-bold mt-2">{itemSelected.name}</h5>
            <h6 className="sm:mt-2">{itemSelected.ingrediants}</h6>
          </div>
          <div className="sm:mt-10 sm:ml-10">
            {itemSelected.variants.map((variant) => {
              return (
                <VariantBox
                  variant={variant}
                  quantity={calcluteQuantityOfVariant(variant)}
                  addDataToCart={addDataToCart}
                  productId={itemSelected.id}
                />
              );
            })}
          </div>
        </div>
        <div className="text-right mb-10">
          <button
            onClick={closeModal}
            class="px-2 py-0.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemModal;
