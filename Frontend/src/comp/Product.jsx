import React, { useState } from "react";
import Header from "./Header";

const Product = () => {
  // State for customer part number
  const [customerPartNumber, setCustomerPartNumber] = useState("");

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // You can add code here to send the customer part number to your backend or perform any action
    console.log("Customer Part Number submitted:", customerPartNumber);

    // Reset the input field
    setCustomerPartNumber("");
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-20">
        <h2 className="text-lg font-semibold mb-4">Add Customer Part Number</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="customerPartNumber"
            >
              Customer Part Number
            </label>
            <input
              type="text"
              id="customerPartNumber"
              value={customerPartNumber}
              onChange={(e) => setCustomerPartNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Customer Part Number"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Product;
