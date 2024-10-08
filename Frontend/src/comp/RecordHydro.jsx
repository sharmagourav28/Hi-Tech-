import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa'; // Importing trash icon from react-icons

const RecordHydro = () => {
	const inspectionParameters = [
		{
			parameter: 'Receiver No. on Data Plate',
			specification: '1830098598',
			method: 'Visual',
		},
		{
			parameter: 'Orientation of the Data plate (apposite ball Valve)',
			specification: 'As per drawing',
			method: 'Visual',
		},
		{
			parameter: 'Weld Nut on Bkt',
			specification: 'M10X1.5(11 nos.)',
			method: 'TPG',
		},
		{
			parameter: 'Hydro test',
			specification: 'Verification Sr. No',
			method: 'Visual',
		},
		{
			parameter: 'Painting',
			specification: 'Inside (Black)',
			method: 'Visual',
		},
		{
			parameter: 'All Threaded Hole & Ball Valve Check',
			specification: 'As per drawing',
			method: 'TPG',
		},
		{
			parameter: 'Weld Aesthetic',
			specification: 'No Aesthetic defect',
			method: 'Visual',
		},
		{
			parameter: 'Painting check (Color)',
			specification: 'RAL7021',
			method: 'Visual',
		},
		{
			parameter: 'Painting check Defect',
			specification: 'No paint defect',
			method: 'Visual',
		},
		{
			parameter: 'Inside Cleaning (Fully)',
			specification: 'No foreign particle, dust',
			method: 'Visual',
		},
		{
			parameter: 'Oiling',
			specification: 'All machining surfaces',
			method: 'Visual',
		},
		{
			parameter: 'Aesthetic (All Machining surfaces)',
			specification: 'No Dent, Damage & Scratches',
			method: 'Visual',
		},
		{
			parameter: 'Leak test',
			specification: 'Fittings (Ball Valve & Plug)',
			method: 'Visual',
		},
		{
			parameter: 'Dish End (Both Side)',
			specification: 'No wrinkle',
			method: 'Visual',
		},
		{
			parameter: 'Weld Check (inside)',
			specification: 'Proper Penetration',
			method: 'Visual',
		},
		{
			parameter: 'Assy With Wooden base',
			specification: 'No loose fitment',
			method: 'Visual',
		},
		{
			parameter: 'Vessel No. on Data Plate',
			specification: '9095319982',
			method: 'Visual',
		},
		{
			parameter: 'Ball Valve position (40⁰) & Orientation',
			specification: 'As Per OPL',
			method: 'Visual',
		},
		{
			parameter: 'All Threaded Hole Check',
			specification: 'As per drawing',
			method: 'TPG',
		},
		{
			parameter: 'Painting check (Color)',
			specification: 'Structure Gray',
			method: 'Visual',
		},
		{
			parameter: 'Flange orientation',
			specification: 'As Per OPL / As per Drawing /Gauge',
			method: 'Visual',
		},
		{
			parameter: 'Fitting Leak test',
			specification: 'Leak proof',
			method: 'Visual',
		},
		{
			parameter: 'Leg PCD',
			specification: 'Template qualification',
			method: 'By Template',
		},
		{
			parameter: 'Ball valve Thread 1/4"BSP',
			specification: 'No Thread broken',
			method: 'Visual/TPG',
		},
		{
			parameter: 'Nut position (M8) at Leg',
			specification: 'As per drawing',
			method: 'Visual',
		},
		{
			parameter: 'Painting check (Color)',
			specification: 'Plain Gray (RAL:7015)',
			method: 'Visual',
		},
		{
			parameter: "Flange Orientation (Round with 3 no's M8 holes)",
			specification: 'As per drawing',
			method: 'Visual',
		},
		{
			parameter: 'Centre Pipe Co-Centricity',
			specification: '(Max 2mm)',
			method: 'Co-centricity gauge',
		},
		{
			parameter: 'Centre Pipe Ht Check',
			specification: '298.5 ±2 mm',
			method: 'MT',
		},
		{ parameter: 'Sleeve Dia', specification: '46h11', method: 'Snap Gauge' },
		{
			parameter: 'Top Cover',
			specification: 'Verification',
			method: 'Visual Aids',
		},
	];

	// State to store selected parameters
	const [selectedParameters, setSelectedParameters] = useState([]);

	const [formData, setFormData] = useState({
		htmfNo: '',
		customerPartNo: '',
		type: '',
		capacityVolume: '',
		pressureBar: '',
		shellThickness: '',
		capThickness: '',
		flangeThickness: '',
		materialGrade: '',
		selectedParameters: [
			{
				parameter: 'Receiver No. on Data Plate',
				specification: '1830098598',
				method: 'Visual',
			},
			{
				parameter: 'Orientation of the Data plate (apposite ball Valve)',
				specification: 'As per drawing',
				method: 'Visual',
			},
		], //include the defualts if any
	});

	const [hydroTests, setHydroTests] = useState([]);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(15); // Display 15 records per page

	// Fetch hydro test records from the server
	const fetchHydroTests = async () => {
		try {
			const response = await axios.get('http://localhost:5000/api/hydro/tests');
			setHydroTests(response.data);
		} catch (error) {
			console.error('Error fetching hydro test records:', error);
		}
	};

	useEffect(() => {
		fetchHydroTests();
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle checkbox selection
	const handleCheckboxChange = (parameter, specification, method) => {
		console.log(method);
		setFormData((prevFormData) => {
			const currentParameters = prevFormData.selectedParameters;
			const isSelected = currentParameters.some(
				(item) => item.parameter === parameter,
			);

			if (isSelected) {
				// Remove the parameter
				return {
					...prevFormData,
					selectedParameters: currentParameters.filter(
						(item) => item.parameter !== parameter,
					),
				};
			} else {
				// Add the parameter (with default values for specification and method)
				return {
					...prevFormData,
					selectedParameters: [
						...currentParameters,
						{
							parameter,
							specification, // Default value
							method, // Default value
						},
					],
				};
			}
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:5000/api/hydro/tests', formData);
			toast.success('Hydro Test record saved successfully!');

			// Clear the form
			setFormData({
				htmfNo: '',
				customerPartNo: '',
				type: '',
				capacityVolume: '',
				pressureBar: '',
				shellThickness: '',
				capThickness: '',
				flangeThickness: '',
				materialGrade: '',
			});

			fetchHydroTests(); // Refresh the list
		} catch (error) {
			console.error('Error saving hydro test record:', error);
			if (error.response) {
				toast.error(
					`Error: ${error.response.data.message || 'Unknown error occurred'}`,
				);
			} else {
				toast.error('Error sending data to the server');
			}
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:5000/api/hydro/tests/${id}`);
			toast.success('Hydro Test record deleted successfully!');
			fetchHydroTests(); // Refresh the list after deletion
		} catch (error) {
			console.error('Error deleting hydro test record:', error);
			toast.error('Error deleting the record');
		}
	};

	// Pagination logic
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = hydroTests.slice(
		indexOfFirstRecord,
		indexOfLastRecord,
	);
	const totalPages = Math.ceil(hydroTests.length / recordsPerPage);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className='flex flex-col p-6 bg-gray-100 min-h-screen'>
			{/* Hydro Test Records Section */}
			<div className='w-full mb-8'>
				<h2 className='text-xl font-bold mb-4'>Hydro Test Records</h2>
				<div>
					<table className='min-w-full border border-gray-300 overflow-hidden max-w-full'>
						<thead>
							<tr>
								<th className='py-2 px-2 border-b'>S.No</th>
								<th className='py-2 px-2 border-b'>HTMF NO</th>
								<th className='py-2 px-2 border-b'>Customer PART NO</th>
								<th className='py-2 px-2 border-b'>Type</th>
								<th className='py-2 px-2 border-b'>Capacity Volume</th>
								<th className='py-2 px-2 border-b'>Pressure BAR</th>
								<th className='py-2 px-2 border-b'>Shell Thickness</th>
								<th className='py-2 px-2 border-b'>Cap Thickness</th>
								<th className='py-2 px-2 border-b'>Flange Thickness</th>
								<th className='py-2 px-2 border-b'>Material Grade</th>
								<th className='py-2 px-2 border-b'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{currentRecords.map((test, index) => (
								<tr key={test._id}>
									<td className='py-2 px-2 border-b'>
										{indexOfFirstRecord + index + 1}
									</td>
									<td className='py-2 px-2 border-b'>{test.htmfNo}</td>
									<td className='py-2 px-2 border-b'>{test.customerPartNo}</td>
									<td className='py-2 px-2 border-b'>{test.type}</td>
									<td className='py-2 px-2 border-b'>{test.capacityVolume}</td>
									<td className='py-2 px-2 border-b'>{test.pressureBar}</td>
									<td className='py-2 px-2 border-b'>{test.shellThickness}</td>
									<td className='py-2 px-2 border-b'>{test.capThickness}</td>
									<td className='py-2 px-2 border-b'>{test.flangeThickness}</td>
									<td className='py-2 px-2 border-b'>{test.materialGrade}</td>
									<td className='py-2 px-2 border-b'>
										<button
											onClick={() => handleDelete(test._id)}
											className='text-red-600 hover:text-red-800'>
											<FaTrash />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Pagination Controls */}
					<div className='flex justify-between items-center mt-4'>
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}
							className={`px-4 py-2 text-white rounded-md transition duration-300 ${
								currentPage === 1
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-blue-500 hover:bg-blue-600'
							}`}>
							Previous
						</button>
						<p>
							Page {currentPage} of {totalPages}
						</p>
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPages}
							className={`px-4 py-2 text-white rounded-md transition duration-300 ${
								currentPage === totalPages
									? 'bg-gray-400 cursor-not-allowed'
									: 'bg-blue-500 hover:bg-blue-600'
							}`}>
							Next
						</button>
					</div>
				</div>
				<hr class='h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
			</div>

			{/* Record Hydro Test Section */}
			<div className='w-full'>
				<h2 className='text-xl font-bold mb-4'>Record Hydro Test</h2>
				<form
					onSubmit={handleSubmit}
					className='bg-white p-6 rounded shadow-md'>
					<div className='mb-4'>
						<label className='block mb-2'>HTMF NO:</label>
						<input
							type='text'
							name='htmfNo'
							value={formData.htmfNo}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block mb-2'>Customer PART NO:</label>
						<input
							type='text'
							name='customerPartNo'
							value={formData.customerPartNo}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block mb-2'>Type:</label>
						<input
							type='text'
							name='type'
							value={formData.type}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block mb-2'>Capacity Volume:</label>
						<input
							type='text'
							name='capacityVolume'
							value={formData.capacityVolume}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block mb-2'>Pressure BAR:</label>
						<input
							type='text'
							name='pressureBar'
							value={formData.pressureBar}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>
					{/* New Fields */}
					<div className='mb-4'>
						<label className='block mb-2'>Shell Thickness:</label>
						<input
							type='text'
							name='shellThickness'
							value={formData.shellThickness}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block mb-2'>Cap Thickness:</label>
						<input
							type='text'
							name='capThickness'
							value={formData.capThickness}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block mb-2'>Flange Thickness:</label>
						<input
							type='text'
							name='flangeThickness'
							value={formData.flangeThickness}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>
					<div className='mb-4'>
						<label className='block mb-2'>Material Grade:</label>
						<input
							type='text'
							name='materialGrade'
							value={formData.materialGrade}
							onChange={handleChange}
							className='w-full border px-3 py-2'
							required
						/>
					</div>

					<div className='p-4 bg-gray-100'>
						<h3 className=' text-xl font-bold mb-4 '>
							Select Inspection Parameters
						</h3>
						<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
							{inspectionParameters.map((item, index) => (
								<li
									key={index}
									className='w-full border-b border-gray-200 rounded-lg dark:border-gray-600 p-2'>
									<div className='flex items-center'>
										<input
											id={`checkbox-${index}`}
											type='checkbox'
											onChange={() => handleCheckboxChange(item.parameter, item.method, item.specification)}
											value={item.parameter}
											checked={
												formData.selectedParameters?.some(
													(param) => param.parameter === item.parameter,
												) || false
											}
											className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
										/>
										<label
											htmlFor={`checkbox-${index}`}
											className='w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
											{item.parameter}
										</label>
									</div>
								</li>
							))}
						</ul>
					</div>

					<button
						type='submit'
						className='bg-blue-500 text-white px-4 py-2 rounded'>
						Save
					</button>
				</form>
			</div>
			<ToastContainer />
		</div>
	);
};

export default RecordHydro;
