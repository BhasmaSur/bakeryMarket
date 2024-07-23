import React from "react";

const VariantBox = ({
  variant,
  quantity,
  addDataToCart,
  productId,
  pic_url,
}) => {
  const { size = 3, unit = "piece", price = 0, id = 0 } = variant;
  return (
    <div class="grid grid-cols-2 mb-5 sm:mb-10">
      <div className="sm:text-xl font-bold">
        {id}. {size} {unit}
      </div>
      <div className="grid grid-rows-2">
        <div className="sm:text-xl font-bold text-right">₹{price}</div>
        <div className="text-right">
          {quantity === 0 && (
            <button
              onClick={() =>
                addDataToCart({
                  variantId: variant.id,
                  quantity: 1,
                  productId: productId,
                })
              }
              class="px-2 py-0.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Add
            </button>
          )}
          {quantity !== 0 && (
            <>
              <button
                onClick={() =>
                  addDataToCart({
                    variantId: variant.id,
                    quantity: quantity - 1,
                    productId: productId,
                  })
                }
                disabled={quantity <= 0}
                id="incrementBtn"
                class="px-2 py-0.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                -
              </button>
              <span className="ml-3 mr-3">{quantity}</span>
              <button
                onClick={() =>
                  addDataToCart({
                    variantId: variant.id,
                    quantity: quantity + 1,
                    productId: productId,
                  })
                }
                id="incrementBtn"
                class="px-2 py-0.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                +
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VariantBox;
