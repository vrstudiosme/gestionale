import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function Update() {
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		axios
			.get("http://localhost:8081/read/" + id)
			.then((res) => {
				console.log(res);
				setValues({
					...values,
					ruolo: res.data[0].ruolo,
					nome: res.data.nome,
					cognome: res.data[0].cognome,
					dataDiNascita: res.data[0].dataDiNascita,
					giornoLibero: res.data[0].giornoLibero,
					turno: res.data[0].turno,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const [values, setValues] = useState({
		ruolo: "",
		nome: [],
		cognome: "",
		dataDiNascita: "",
		giornoLibero: "",
		turno: "",
	});

	const handleUpdate = (event) => {
		event.preventDefault();
		axios
			.put("http://localhost:8081/update/" + id, values)
			.then((res) => {
				console.log(res);
				navigate("/Dipendenti");
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="Square">
			<form onSubmit={handleUpdate}>
				<h2>Modifica Dipendente</h2>
				<div>
					<label>Ruolo</label>
					<input
						type="text"
						value={values.ruolo}
						onChange={(e) =>
							setValues({ ...values, ruolo: e.target.value })
						}
					></input>
					<br></br>
					<br></br>
					<label>Nome</label>
					<input
						type="text"
						value={values.nome}
						onChange={(e) =>
							setValues({ ...values, nome: e.target.value })
						}
					></input>
					<br></br>
					<br></br>
					<label>Cognome</label>
					<input
						type="text"
						value={values.cognome}
						onChange={(e) =>
							setValues({ ...values, cognome: e.target.value })
						}
					></input>
					<br></br>
					<br></br>
					<label>Data di Nascita</label>
					<input
						type="text"
						value={values.dataDiNascita}
						onChange={(e) =>
							setValues({
								...values,
								dataDiNascita: e.target.value,
							})
						}
					></input>
					<br></br>
					<br></br>
					<label>Giorno Libero</label>
					<select
						input={(e) =>
							setValues({
								...values,
								giornoLibero: e.target.value,
							})
						}
					>
						<option>{values.nome}</option>
					</select>
					<br></br>
					<br></br>
					<label>Turno</label>
					<input
						type="text"
						value={values.turno}
						onChange={(e) =>
							setValues({ ...values, turno: e.target.value })
						}
					></input>
				</div>
				<button className="Login">Modifica</button>
			</form>
		</div>
	);
}

export default Update;
