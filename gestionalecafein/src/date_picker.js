import axios from "axios";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";

export const DatePicker = ({ user, openModal }) => {
	const [selectionRange, setSelectionRange] = useState({
		startDate: new Date(),
		endDate: new Date(),
		key: "selection",
	});

	const handleSelect = (ranges) => {
		setSelectionRange(ranges.selection);
	};

	const confirmSchedule = () => {
		const formData = {
			created_at: new Date().toISOString().split("T")[0],
			startDate: new Date(selectionRange.startDate)
				.toISOString()
				.split("T")[0],
			endDate: new Date(selectionRange.endDate)
				.toISOString()
				.split("T")[0],
			user_id: user.ID,
		};

		axios
			.post("http://localhost:8081/schedule/create", formData)
			.then((response) => console.log(response));
		console.log(formData);
	};

	return (
		<div className="fixed flex justify-center items-center bg-gray-800/40 top-0 left-0 right-0 z-10 py-4 px-1 md:inset-0 h-modal  w-full">
			<div className="relative mx-auto flex-2 flex justify-items-center px-2 w-full lg:w-4/12 md:w-4/12t">
				<div className="relative bg-white px-6 py-8 items-center text-black w-full  flex-col rounded-md">
					<div className="card p-2">
						<DateRangePicker
							ranges={[selectionRange]}
							onChange={handleSelect}
							showPreview={true}
						/>
					</div>

					<div className="flex justify-end">
						<button
							className="bg-orange-400 p-2 rounded-full w-4/12 flex justify-center"
							onClick={confirmSchedule}
						>
							Confirm
						</button>
					</div>
					<div className="flex justify-end mt-4">
						<button
							className="p-1 bg-gray-400 rounded-md"
							onClick={() => openModal(false)}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
