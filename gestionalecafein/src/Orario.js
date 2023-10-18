import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Component, useEffect, useMemo } from "react";
import { DateRangePicker } from "react-date-range";

import React, { useState } from "react";
import axios from "axios";
import MaterialReactTable from "material-react-table";
import { UsersTable } from "./dipendenti_table";
const MyComponent = () => {
	const [selectionRange, setSelectionRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const handleSelect = (ranges) => {
		console.log(ranges);
		setSelectionRange(ranges.selection);
		// {
		//   selection: {
		//     startDate: [native Date Object],
		//     endDate: [native Date Object],
		//   }
		// }
	};

	return (
		<DateRangePicker
			ranges={[selectionRange]}
			onChange={handleSelect}
			showPreview={true}
		/>
	);
};

const Orario = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchUsers = () => {
		setLoading(true);
		axios
			.get("http://localhost:8081/Dipendenti")
			.then((res) => {
				setData(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="card bg-white h-screen p-2">
			<div className="bg-orange-500 p-1"></div>
			<div
				className="text-center bg-orange-400 p-3 font-bold"
				style={{ fontSize: 22 }}
			>
				Genera Orario
			</div>
			<div className="card m-2">
				<UsersTable data={data} />
			</div>
		</div>
	);
};

export default Orario;

// export default ResponsiveDateRangePickers;
