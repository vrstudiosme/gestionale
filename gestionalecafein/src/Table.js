import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useEffect, useRef } from "react";

import React, { useState } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const Table = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const componentPDF = useRef();
	const fetchUsers = () => {
		setLoading(true);
		axios
			.get("http://localhost:8081/Holidate")
			.then((res) => {
				console.log(res.data);
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	const generatePDF = useReactToPrint({
		content: () => componentPDF.current,
		documentTitle: "Calendar",
		onAfterPrint: () => {
			alert("PDF Downloaded");
		},
	});

	// Calculate the start and end dates for the current week
	const currentDate = new Date();
	const currentDayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
	const startDate = new Date(currentDate);
	startDate.setDate(currentDate.getDate() - currentDayOfWeek);
	const endDate = new Date(startDate);
	endDate.setDate(startDate.getDate() + 6);

	const getDatesBetween = (startDate, endDate) => {
		const dates = [];
		let currentDate = new Date(startDate);

		while (currentDate <= endDate) {
			dates.push(new Date(currentDate));
			currentDate.setDate(currentDate.getDate() + 1);
		}

		return dates;
	};

	const dateHeaders = getDatesBetween(startDate, endDate).map((date) =>
		date.toLocaleDateString()
	);

	const theader = dateHeaders; // Only dates, no other headers

	return (
		<div className="card bg-white h-screen p-2" ref={componentPDF}>
			<div className="bg-orange-500 p-1"></div>
			<div
				className="text-center bg-orange-400 p-3 font-bold"
				style={{ fontSize: 22 }}
			>
				Table
			</div>
			<div className="card m-2">
				<h1 className="flex align-center">MORNING</h1>
				<table>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Modifiche</th>
							<th>Ruoli</th>
							{theader.map((header, index) => (
								<th key={index}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr key={item.id}>
								<td>{item.nome}</td>
								<td>{item.modifiche}</td>
								<td>{item.ruoli}</td>
								{theader.map((header, index) => {
									const formattedGiornoLibero =
										item.giornoLibero &&
										new Date(
											item.giornoLibero
										).toLocaleDateString();

									let cellContent = "Work Day";
									let cellClass = "bg-red-500 text-white";

									if (formattedGiornoLibero === header) {
										cellContent = "Holiday";
										cellClass = "bg-blue-500 text-white";
									} else if (
										formattedGiornoLibero &&
										theader[index - 1] ===
											formattedGiornoLibero
									) {
										if (item.turno === 0) {
											cellContent = "Morning";
											cellClass =
												"bg-green-500 text-white";
										} else if (item.turno === 1) {
											cellContent = "Evening";
											cellClass = "bg-yellow-500";
										}
									}

									return (
										<td key={index} className={cellClass}>
											{cellContent}
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<button
				onClick={generatePDF}
				className="p-5 justify-self-end border rounded-md bg-slate-800 text-white"
			>
				Download Calendar
			</button>
		</div>
	);
};

export default Table;
