import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Read() {
	const { id } = useParams();
	const [dipendente, setDipendente] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:8081/read/" + id)
			.then((res) => {
				console.log(res);
				setDipendente(res.data[0]);
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className="Square">
			<h2>Dettagli Dipendente</h2>
			<h2>{dipendente.ID}</h2>
			<h2>{dipendente.ruolo}</h2>
			<h2>{dipendente.nome}</h2>
			<h2>{dipendente.cognome}</h2>
			<h2>{dipendente.dataDiNascita}</h2>
			<h2>{dipendente.giornoLibero}</h2>
			<h2>{dipendente.turno}</h2>
			<Link to="/Dipendenti">
				<button>Indietro</button>
			</Link>
			<Link to={`/edit/${dipendente.ID}`}>
				<button>Modifica</button>
			</Link>
		</div>
	);
}

export default Read;
