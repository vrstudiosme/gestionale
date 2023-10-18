import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "php@12345.localhost",
	database: "gestionale",
});

app.post("/dati", (req, res) => {
	db.query(
		"SELECT * FROM Dipendenti",
		[
			ID,
			ruoli,
			nome,
			cognome,
			dataDiNascita,
			giornoLibero,
			turno,
			turniSettimana,
		],
		(err, result) => {
			if (err) {
				res.send({ err: err });
			}

			if (result.length > 0) {
				res.send(result);
			}
		}
	);
});

app.post("/auth/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	const query = "SELECT * FROM carmine WHERE username = ? AND password = ?";

	const result = db.query(query, [username, password], (err, results) => {
		if (err) {
			console.error(err);
			// Handle the error, e.g., send an error response
			res.status(500).send({ error: "An error occurred" });
		} else {
			if (results.length > 0) {
				// Send the results as a response if user is found
				res.send(results);
			} else {
				// Send an error message if user is not found
				res.status(401).send({
					message: "Username/Password incorrect",
				});
			}
		}
	});
	console.log(result);
});

app.get("/Dipendenti", (req, res) => {
	const sql = "SELECT * FROM dipendente";
	db.query(sql, (err, result) => {
		if (err) return res.json({ Message: "Errore nel server" });
		return res.json(result);
	});
});

app.get("/Holidate", (req, res) => {
	const sql = `
        SELECT * FROM dipendente;
    `;
	db.query(sql, (err, result) => {
		if (err) return res.json(err);
		return res.json(result);
	});
});

app.post("/crea", (req, res) => {
	const sql =
		"INSERT INTO `dipendente`(`ruoli`, `nome`, `cognome`, `dataDiNascita`, `giornoLibero`, `turno`) VALUES (?)";
	const values = [
		req.body.ruolo,
		req.body.nome,
		req.body.cognome,
		req.body.dataDiNascita,
		req.body.giornoLibero,
		req.body.turno,
	];
	db.query(sql, [values], (err, result) => {
		if (err) return res.json(err);
		return res.json(result);
	});
});

app.get("/read/:id", (req, res) => {
	const sql = "SELECT * FROM dipendente WHERE ID = ?";
	const id = req.params.id;

	db.query(sql, [id], (err, result) => {
		if (err) return res.json(err);
		return res.json(result);
	});
});

app.post("/schedule/create", (req, res) => {
	const sql =
		"INSERT INTO `schedules`(`user_id`,`created_at`, `start`, `end`) VALUES (?,?,?,?)";
	db.query(
		sql,
		[
			Number.parseInt(req.body.user_id),
			req.body.created_at,
			req.body.startDate,
			req.body.endDate,
		],
		(err, result) => {
			if (err) return res.json(err);
			return res.json("Schedule created successfully");
		}
	);
});

app.get("/schedule/getAll", (req, res) => {
	const sql =
		"select concat('Nome: ', d.nome, ' - Turno: ', d.turno, ' - Modifiche: ', d.modifiche) as title,s.start,s.end from schedules s LEFT JOIN dipendente d ON d.ID = s.user_id;";
	db.query(sql, (err, result) => {
		if (err) return res.json(err);
		return res.json(result);
	});
});
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});
// select d.nome,s.start,s.end from schedules s LEFT JOIN dipendente d ON d.ID = s.user_id;
app.put("/update/:id", (req, res) => {
	const sql =
		"UPDATE `dipendente` SET `ruoli`=?,`nome`=?,`cognome`=?,`dataDiNascita`=?,`giornoLibero`=?,`turno`=?, `modifiche`=modifiche+1 WHERE ID = ?";
	const id = req.params.id;
	db.query(
		sql,
		[
			req.body.ruolo,
			req.body.nome,
			req.body.cognome,
			req.body.dataDiNascita,
			req.body.giornoLibero,
			req.body.turno,
			id,
		],
		(err, result) => {
			if (err) return res.json(err);
			return res.json(result);
		}
	);
});

app.delete("/Dipendenti/delete/:id", (req, res) => {
	const sql = "DELETE FROM dipendente WHERE ID = ?";
	const id = req.params.id;
	db.query(sql, [id], (err, result) => {
		if (err) return res.json(err);
		return res.json(result);
	});
});

app.listen(8081, () => {
	console.log("Listening");
});
