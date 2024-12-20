import React,{useActionState, useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const initialUser = {
	name :"",
    email:"",
    password:""
}

export const Navbar = () => {
	const {actions} = useContext(Context)


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Proyecto Elio</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Iniciar Sesion</button>
					</Link>
					<Link to="/login">
						<button onClick={()=>actions.close()} className="btn btn-primary ms-2">Cerrar Sesion</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
