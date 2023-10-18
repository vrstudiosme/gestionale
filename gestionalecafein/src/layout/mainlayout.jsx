import { Link, Outlet } from "react-router-dom";
import "../Sidebar.css";

export const MainLayout = () => {
	function openNav() {
		document.getElementById("mySidebar").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
	}
	let c;
	function closeNav() {
		document.getElementById("mySidebar").style.width = "0";
		document.getElementById("main").style.marginLeft = "0";
	}
	return (
		<div
			style={{
				backgroundImage: "url(/images/bg.png)",
				position: "fixed",
				minWidth: "100%",
				minHeight: "100%",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div id="main">
				<div id="mySidebar" className="sidebar rounded-md shadow-md">
					<div className="closebtn" onClick={() => closeNav()}>
						x
					</div>
					<Link to="/Home">Calendario</Link>
					<Link to="Dipendenti">Dipendenti</Link>
					<Link to="Genera_Orario">Genera Orario</Link>
					<Link to="Table">Table</Link>
				</div>
				<button className="openbtn" onClick={() => openNav()}>
					☰
				</button>
			</div>
			<h3
				className="text-white text-center"
				style={{
					fontFamily: "monospace",
					fontSize: 28,
					fontWeight: "bold",
				}}
			>
				Gestionale CafeIN
			</h3>
			<div></div>
			<main>
				<div className="p-4">
					<Outlet />
				</div>
			</main>
		</div>
	);
};
