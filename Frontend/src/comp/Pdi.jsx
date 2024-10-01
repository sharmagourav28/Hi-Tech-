import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Pdi = () => {
  // State for the form fields
  const [testDate, setTestDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0]; // Default to current date
    return today;
  });
  const [passFail, setPassFail] = useState("");
  const [remark, setRemark] = useState("");

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to generate certificate or any further processing
    console.log({
      testDate,
      passFail,
      remark,
    });
    alert("Certificate Generated!");
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            {/* Test Date */}
            <div className="mb-5">
              <label
                htmlFor="testDate"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Test Date
              </label>
              <input
                type="date"
                name="testDate"
                id="testDate"
                value={testDate}
                onChange={(e) => setTestDate(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Pass/Fail Dropdown */}
            <div className="mb-5">
              <label
                htmlFor="passFail"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Pass or Fail
              </label>
              <select
                name="passFail"
                id="passFail"
                value={passFail}
                onChange={(e) => setPassFail(e.target.value)}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">Select</option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
            </div>

            {/* Remark */}
            <div className="mb-5">
              <label
                htmlFor="remark"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Remarks
              </label>
              <textarea
                name="remark"
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="Add any remarks"
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            {/* Generate Certificate Button */}
            <div>
              <button
                type="submit"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Generate Certificate
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pdi;
