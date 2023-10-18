import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Crea() {
	const [values, setValues] = useState({
		ruolo: "",
		nome: "",
		cognome: "",
		dataDiNascita: "",
		giornoLibero: "",
		turno: "",
	});
	const navigate = useNavigate();
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8081/Crea", values)
			.then((res) => {
				console.log(res);
				navigate("/Dipendenti");
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className="Square">
			<form onSubmit={handleSubmit}>
				<h2>Aggiungi Dipendente</h2>
				<div>
					<label>Ruolo</label>
					<input
						type="text"
						onChange={(e) =>
							setValues({ ...values, ruolo: e.target.value })
						}
					></input>
					<br></br>
					<br></br>
					<label>Nome</label>
					<input
						type="text"
						onChange={(e) =>
							setValues({ ...values, nome: e.target.value })
						}
					></input>
					<br></br>
					<br></br>
					<label>Cognome</label>
					<input
						type="text"
						onChange={(e) =>
							setValues({ ...values, cognome: e.target.value })
						}
					></input>
					<br></br>
					<br></br>
					<label>Data di Nascita</label>
					<input
						type="text"
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
					<input
						type="text"
						onChange={(e) =>
							setValues({
								...values,
								giornoLibero: e.target.value,
							})
						}
					></input>
					<br></br>
					<br></br>
					<label>Turno</label>
					<input
						type="text"
						onChange={(e) =>
							setValues({ ...values, turno: e.target.value })
						}
					></input>
				</div>
				<button className="Login">Invia</button>
			</form>
		</div>
	);
}

export default Crea;
