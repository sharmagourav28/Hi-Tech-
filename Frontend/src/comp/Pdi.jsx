import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';

// Function to check serial number against the backend
const checkSerialNumber = async (serialNumber) => {
	console.log('Edrr');
	try {
		console.log('Edrr 1');
		const response = await fetch(
			`http://localhost:5000/api/hydro/check/${serialNumber}`,
		);

		console.log('Edrr 2');
		if (!response.ok) {
			throw new Error('Not Found');
		}
		console.log('Edrr 3');
		const data = await response.json();
		return data.result; // Return the status from the response
	} catch (error) {
		console.error('Error checking serial number:', error);
		return null; // Return null in case of error
	}
};

const Pdi = () => {
	const data = [
		{
			parameter: 'Apple MacBook Pro 17"',
			specification: 'Silver',
			methodOfInspection: 'Visual Inspection',
		},
		{
			parameter: 'Dell XPS 15',
			specification: 'Black',
			methodOfInspection: 'Manual Check',
		},
		{
			parameter: 'HP Spectre x360',
			specification: 'Blue',
			methodOfInspection: 'Automated Testing',
		},
	];

	const [testDate, setTestDate] = useState(() => {
		const today = new Date().toISOString().split('T')[0]; // Default to current date
		return today;
	});
	const [remark, setRemark] = useState('');
	const [serialNumber, setSerialNumber] = useState('');
	const [customerPartNumber, setCustomerPartNumber] = useState(''); // State for customer part number
	const [checkStatus, setCheckStatus] = useState(''); // State to hold check result
	const [errorMessage, setErrorMessage] = useState(''); // State for error messages

	// Check if the generate certificate button should be enabled
	const isButtonEnabled = serialNumber.length === 12 && checkStatus === 'Pass';

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();
		// Logic to generate certificate or any further processing
		console.log({
			testDate,
			remark,
			serialNumber,
			customerPartNumber, // Log the customer part number
		});
		alert('Certificate Generated!');
	};

	// Handle check button click
	const handleCheck = async () => {
		setErrorMessage(''); // Clear any previous error messages
		const status = await checkSerialNumber(serialNumber);
		if (status) {
			setCheckStatus(status); // Update check status
		} else {
			setCheckStatus('Not Found');
			setErrorMessage('Serial number not found. Please check again.');
		}
	};

  const [htmfData, setHtmfData] = useState([]);

  const handleLoadParametes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hydro/htmf/${customerPartNumber}`
      );
      
      // Ensure response structure is correct
      if (response.data && Array.isArray(response.data.selectedParameters)) {
        setHtmfData(response.data.selectedParameters);
      } else {
        console.error("Unexpected response structure:", response.data);
      }
      
    } catch (error) {
      console.error("Error fetching data for selected ID:", error);
    }
  };
  

	return (
		<>
			<Header />
			<div className='flex items-center justify-center p-12 mt-20'>
				<div className='mx-auto w-full max-w-[550px] mt-12'>
					{' '}
					{/* Added bg-yellow-200 */}
					{/* Heading for the form */}
					<h2 className='text-4xl font-extrabold text-center text-orange-600 mb-8 tracking-wide uppercase font-poppins '>
						Hi-Tech Metal Pdi Test
					</h2>
					<form onSubmit={handleSubmit}>
						{/* Form Fields Container */}
						<div className='flex flex-wrap mb-5 gap-4'>
							{/* Test Date */}
							<div className='flex-grow'>
								<label
									htmlFor='testDate'
									className='mb-3 block text-base font-medium text-[#07074D]'>
									Test Date
								</label>
								<input
									type='date'
									name='testDate'
									id='testDate'
									value={testDate}
									onChange={(e) => setTestDate(e.target.value)}
									className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
								/>
							</div>

							{/* Serial Number */}
							<div className='flex-grow relative'>
								<label
									htmlFor='serialNumber'
									className='mb-2 block text-base font-medium text-[#07074D]'>
									Serial Number (12 Digits)
								</label>
								<div className='flex items-center'>
									<input
										type='text'
										name='serialNumber'
										id='serialNumber'
										value={serialNumber}
										onChange={(e) =>
											setSerialNumber(e.target.value.toUpperCase())
										} // Convert to uppercase
										maxLength={14} // Set max length to 12
										pattern='^[A-Z0-9]{14}$' // Restrict to exactly 12 uppercase letters/numbers
										required // Make this field required
										className='flex-grow rounded-l-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md mt-1'
									/>
									<button
										type='button'
										onClick={handleCheck}
										className='rounded-r-md bg-[#6A64F1] py-3 px-6 text-base font-semibold text-white hover:bg-[#5A54D1] focus:outline-none focus:ring-2 focus:ring-[#6A64F1] focus:ring-opacity-50'>
										Check
									</button>
								</div>
							</div>

							{/* Customer Part Number */}
							<div className='flex-grow justify-center'>
								<label
									htmlFor='customerPartNumber'
									className='mb-3 block text-base font-medium text-[#07074D]'>
									HMFT Number
								</label>
								<input
									type='text'
									name='customerPartNumber'
									id='customerPartNumber'
									value={customerPartNumber}
									onChange={(e) => setCustomerPartNumber(e.target.value)}
									placeholder='Enter customer part number'
									className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
								/>
							</div>
						</div>
						<div className='flex w-full justify-center'>
							<button
              onClick={handleLoadParametes}
								type='button'
								class='text-white  content-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								<span>Load Parameters</span>

								<svg
									class='w-5 h-5 ml-3'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 14 10'>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M1 5h12m0 0L9 1m4 4L9 9'
									/>
								</svg>
								<span class='sr-only'>Icon description</span>
							</button>
						</div>

						{/* Check Status */}
						{checkStatus && (
							<div className='mb-5 text-center text-base font-medium'>
								<span
									className={`${
										checkStatus === 'Pass' ? 'text-green-500' : 'text-red-600'
									}`}>
									Status: Hydro Test {checkStatus}
								</span>
							</div>
						)}
						{/* Error Message */}
						{errorMessage && (
							<div className='mb-5 text-center text-base font-medium text-red-600'>
								{errorMessage}
							</div>
						)}

						{/* Generate Certificate Button */}
					</form>
				</div>
			</div>

			<div className='relative overflow-x-auto m-5 bg-white shadow-md rounded-lg'>
				<table className='w-full text-sm text-left text-gray-800'>
					<thead className='text-xs text-gray-600 uppercase bg-gray-200'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								PARAMETER
							</th>
							<th scope='col' className='px-6 py-3'>
								SPECIFICATION
							</th>
							<th scope='col' className='px-6 py-3'>
								METHOD OF INSPECTION
							</th>
							<th scope='col' className='px-6 py-3'>
								OBSERVATION
							</th>
							<th scope='col' className='px-6 py-3'>
								REMARKS
							</th>
						</tr>
					</thead>
					<tbody>{htmfData.map((item, index) => (
    <tr
        key={index}
        className='bg-white border-b hover:bg-gray-100 transition-colors duration-200'>
        <th
            scope='row'
            className='px-6 py-4 font-semibold text-gray-900 whitespace-nowrap'>
            {item.parameter}
        </th>
        <td className='px-6 py-4'>{item.specification}</td>
        <td className='px-6 py-4'>{item.method}</td> {/* Adjusted methodOfInspection to method */}
        <td className='px-6 py-4'>
            <div className='grid grid-cols-5 gap-4'>
                {Array.from({ length: 5 }, (_, i) => (
                    <input
                        key={i}
                        type='text'
                        placeholder={`Observation ${i + 1}`}
                        className='border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150'
                    />
                ))}
            </div>
        </td>
        <td className='px-6 py-4'>
            <input
                type='text'
                placeholder='Remarks'
                className='border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring focus:ring-blue-300 transition duration-150'
            />
        </td>
    </tr>
))}
</tbody>
				</table>
			</div>
		</>
	);
};

export default Pdi;
