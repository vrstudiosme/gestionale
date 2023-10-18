import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MaterialReactTable from "material-react-table";
import { Avatar, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { DatePicker } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers-pro';

const Home = (props) => {
	const [data, setData] = useState([]);
	const [selectedUser, setselectedUser] = useState(null);
	const [showEditmodal, setshowEditmodal] = useState(false);
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

	const handleDelete = (id) => {
		axios
			.delete("http://localhost:8081/Dipendenti/delete/" + id)
			.then((res) => {
				fetchUsers();
			})
			.catch((err) => console.log(err));
	};

	const dataMap = data.map((d) => ({
		...d,
		seleziona: (
			<button
				onClick={() => {
					setselectedUser(d);
					// setshowPermissionsmodal(true)
					// setSelectedRole(r)
				}}
			>
				{" "}
				<Avatar
					variant="circular"
					style={{
						backgroundColor: "lightgreen",
					}}
				>
					+
				</Avatar>
			</button>
		),
		modifica: (
			<button
				onClick={() => {
					setselectedUser(d);
					setshowEditmodal(true);
					// setshowPermissionsmodal(true)
					// setSelectedRole(r)
				}}
			>
				{" "}
				<Avatar
					variant="circular"
					style={{
						backgroundColor: "white",
					}}
				>
					<Edit className="text-green-400" />
				</Avatar>
			</button>
		),
		elimina: (
			<button
				onClick={() => {
					handleDelete(d.ID);
					// setshowPermissionsmodal(true)
					// setSelectedRole(r)
				}}
			>
				{" "}
				<Avatar
					variant="standard"
					style={{
						backgroundColor: "red",
					}}
				>
					<DeleteIcon />
				</Avatar>
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
				header: "Ruolo",
				accessorKey: "ruoli",
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
				header: "DataDiNascita",
				accessorKey: "dataDiNascita",
			},
			{
				header: "Modifiche",
				accessorKey: "modifiche",
			},
			{
				header: "Turno (0=Mattina, 1=Sera)",
				accessorKey: "turno",
			},
			{
				header: "Seleziona",
				accessorKey: "seleziona",
			},
			{
				header: "Modifica",
				accessorKey: "modifica",
			},
			{
				header: "Elimina",
				accessorKey: "elimina",
			},
		],
		[data]
	);

	return (
		<div className="bg-white h-screen mx-auto">
			<div>
				<h2
					className="text-center bg-orange-400 p-3 font-bold"
					style={{ fontSize: 22 }}
				>
					Dipendenti
				</h2>
			</div>
			<div className="card justify-center flex p-2 w-fit">
				{loading ? (
					<div className="flex justify-center">
						<img src="/images/ball_loader.gif" alt="Loading" />
					</div>
				) : (
					<div
						className="overscroll-contain justify-center m-4"
						style={{ width: "100%" }}
					>
						<div style={{ width: "1800px" }} className="p-0 m-0">
							<MaterialReactTable
								columns={columns}
								data={dataMap}
								style={{
									overflowX: "hidden",
								}}
							/>
						</div>
					</div>
				)}
			</div>

			{showEditmodal && (
				<EditModal
					user={selectedUser}
					openModal={setshowEditmodal}
					refetchFn={fetchUsers}
				/>
			)}
		</div>
	);
};
export default Home;

const EditModal = ({ user, openModal, refetchFn }) => {
	console.log(user);
	const [flashMessage, setFlashmessage] = useState(null);
	const [nome, setNome] = useState(user.nome);
	const [cognone, setCognome] = useState(user.cognome);
	const [ruoli, setRuoli] = useState(user.ruoli);
	const [turno, setTurno] = useState(user.turno);
	const [libero, setLibero] = useState(user.giornoLibero);
	const [date, setDate] = useState(user.dataDiNascita);

	const processUserEdit = (e) => {
		e.preventDefault();
		let formData = {
			ruolo: ruoli,
			nome: nome,
			cognome: cognone,
			dataDiNascita: date,
			giornoLibero: libero,
			turno: turno,
		};
		axios
			.put(`http://localhost:8081/update/${user.ID}`, formData)
			.then((response) => {
				setFlashmessage(
					<div className="p-2 bg-green-400 text-white text-center">
						Update successfull
					</div>
				);
				refetchFn();
			})
			.catch((err) => console.log(err));
		//  .then(response=> setFlashmessage(<div className="p-2 bg-green-400 text-white">{response}</div>))
	};

	return (
		<div className="fixed flex justify-center items-center bg-gray-800/40 top-0 left-0 right-0 z-10 py-4 px-1 md:inset-0 h-modal  w-full">
			<div className="relative mx-auto flex-2 flex justify-items-center px-2 w-full lg:w-4/12 md:w-4/12t">
				<div className="relative bg-white px-6 py-8 items-center text-black w-full  flex-col rounded-md">
					<div className="bg-orange-400 text-center m-2 p-1">
						Modifica {user.nome} {user.cognome}{" "}
					</div>
					{flashMessage && flashMessage}
					<form onSubmit={processUserEdit}>
						<div className="card">
							<div
								className="border border-2 m-2 rounded-md p-4 grid grid-cols-1 gap-3"
								style={{
									height: "380px",
								}}
							>
								<TextField
									variant="standard"
									placeholder="Ruolo"
									label="Ruoli"
									className="w-full"
									defaultValue={user.ruoli}
									value={ruoli}
									onChange={(e) => setRuoli(e.target.value)}
								/>
								<TextField
									variant="standard"
									placeholder="Nome"
									label="Nome"
									className="w-full"
									defaultValue={user.nome}
									onChange={(e) => setNome(e.target.value)}
									value={nome}
								/>
								<TextField
									variant="standard"
									placeholder="Cognome"
									label="Cognome"
									className="w-full"
									defaultValue={user.cognome}
									onChange={(e) => setCognome(e.target.value)}
									value={cognone}
								/>

								<div className="grid grid-cols-2">
									<p>Giorno Libero</p>
									<input
										type="date"
										defaultValue={user.giornoLibero}
										className="p-2 rounded-md border border-gray-400 border-2 focus:border-green-600 outline-none"
										onChange={(e) =>
											setLibero(e.target.value)
										}
										value={libero}
									/>
								</div>
								<div className="grid grid-cols-2">
									<p>DataDiNascita</p>
									<input
										type="date"
										defaultValue={user.dataDiNascita}
										className="p-2 rounded-md border border-gray-400 border-2 focus:border-green-600 outline-none"
										onChange={(e) =>
											setDate(e.target.value)
										}
									/>
								</div>
								<TextField
									variant="standard"
									placeholder="Turno"
									label="Turno (0=Mattina, 1=Sera)"
									className="w-full"
									defaultValue={user.turno}
									onChange={(e) => setTurno(e.target.value)}
									value={turno}
								/>
							</div>
							<div className="flex flex-row justify-center mx-auto gap-8 mt-4">
								<button
									className="p-1 bg-green-500 rounded-md"
									type="submit"
								>
									Save
								</button>
								<button
									className="p-1 bg-gray-400 rounded-md"
									onClick={() => openModal(false)}
								>
									Cancel
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
