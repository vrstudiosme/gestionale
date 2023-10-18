import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Login } from "./Login";
import Home from "./Home";
import Dipendenti from "./Dipendenti";
import Crea from "./Crea";
import Read from "./Read";
import Update from "./Update";
import { MainLayout } from "./layout/mainlayout";
import Orario from "./Orario";
import Table from "./Table";

function App() {
	return (
		<BrowserRouter basename="">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Home" element={<MainLayout></MainLayout>}>
					<Route index element={<Home />} />
					<Route path="Dipendenti" element={<Dipendenti />} />
					<Route path="Crea" element={<Crea />} />
					<Route path="Genera_Orario" element={<Orario />} />
					<Route path="Read/:id" element={<Read />} />
					<Route path="Edit/:id" element={<Update />} />
					<Route path="Table" element={<Table />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
