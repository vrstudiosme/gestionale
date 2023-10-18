import { CalendarIcon } from "@mui/x-date-pickers";
import MaterialReactTable from "material-react-table";
import { useMemo, useState } from "react";
import { DatePicker } from "./date_picker";

export const UsersTable = ({ data }) => {
	const [showcalendar, setShowcalendar] = useState(false);
	const [selecteduser, setSelecteduser] = useState(null);

	const dataMap = data.map((d) => ({
		...d,
		calendar: (
			<button
				onClick={() => {
					setSelecteduser(d);
					setShowcalendar(true);
					// setshowPermissionsmodal(true)
					// setSelectedRole(r)
				}}
			>
				<CalendarIcon />
			</button>
		),
	}));
	const columns = useMemo(
		() => [
			{
				header: "ID",
				accessorKey: "ID",
			},

			{
				header: "Nome",
				accessorKey: "nome",
			},
			{
				header: "Cognome",
				accessorKey: "cognome",
			},
			{
				header: "Giorno Libero",
				accessorKey: "giornoLibero",
			},

			{
				header: "Turno",
				accessorKey: "turno",
			},

			{
				header: "Elimina",
				accessorKey: "calendar",
			},
		],
		[data]
	);

	return (
		<div>
			<MaterialReactTable columns={columns} data={dataMap} />
			{showcalendar && (
				<DatePicker user={selecteduser} openModal={setShowcalendar} />
			)}
		</div>
	);
};
