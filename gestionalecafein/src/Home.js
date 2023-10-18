import React, { useEffect, useState, useRef } from "react";
import {
	Calendar,
	globalizeLocalizer,
	momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import globalize from "globalize";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useMemo } from "react";

import { useReactToPrint } from "react-to-print";

function Home() {
	const componentPDF = useRef();

	const generatePDF = useReactToPrint({
		content: () => componentPDF.current,
		documentTitle: "Calendar",
		onAfterPrint: () => {
			alert("PDF Downloaded");
		},
	});

	const fetchSchedules = () => {
		axios.get("http://localhost:8081/schedule/getAll").then((response) => {
			console.log(response.data);
			setEvents(response.data);
		});
	};
	useEffect(() => {
		fetchSchedules();
	}, []);

	const [events, setEvents] = useState([]);
	// let events = [{
	//   start: '2023/10/10 08:00',
	//   end: '2023/10/15'
	// }]

	// const giorniLavoro = []
	// function Turno() {
	//   for (let i = 0; i < giorniSettimana.length; i++) {
	//     if (giorniSettimana[i] !== Christian[5])
	//       giorniLavoro.push(giorniSettimana[i])
	//   }
	//   return giorniLavoro
	// }

	const localizer = momentLocalizer(moment);

	const [selectedDate, setselectedSlot] = useState(null);
	const handleSelectSlot = (selection) => {
		setselectedSlot(selection);
		console.log("start", selection);
		// console.log('end', selection.end)
	};

	return (
		<div className="bg-white h-screen p-2 flex-col gap-8">
			<div
				ref={componentPDF}
				style={{ width: "100%" }}
				className="p-4 h-fit border border-gray-400 rounded-md shadow-md "
			>
				<Calendar
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					selectable="ignoreEvents"
					style={{ height: 500 }}
					onSelectSlot={handleSelectSlot}
					slotPropGetter={(date) => {
						if (
							selectedDate &&
							moment(date).isSame(selectedDate, "day")
						) {
							return { className: "rbc-selected-cell" };
						}
						return {};
					}}
				/>
			</div>
			<button
				onClick={generatePDF}
				className="p-5 justify-self-end border rounded-md bg-slate-800 text-white"
			>
				Download Calendar
			</button>
		</div>
	);
}
export default Home;
