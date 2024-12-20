import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const initialUser = {
	email: "",
	password: ""
}


export const Login = () => {
	const { actions } = useContext(Context);
	const [user, setUser] = useState(initialUser)
	const navigate = useNavigate()

	const handleChange = ({ target }) => {
		setUser({
			...user,
			[target.name]: target.value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const response = await actions.login(user)

		if (response == 200) {
			navigate("/private")
		} else if (response == 404) {
			alert('wrong credentials')
		}
	}

	return (
		<div className="container">
			<div className="row justify-content-center mt-5">
				<h1 className="text-center">Ingresa en nuestra pagina</h1>
				<div className="col-12 col-md-6 p-3 mt-3">
					<form className="border p-3" onSubmit={handleSubmit}>
						<div className="mb-3">
							<label for="exampleInputEmail1" className="form-label">Correo</label>
							<input
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								name="email"
								value={user.email}
								onChange={handleChange}
								aria-describedby="emailHelp" />
						</div>

						<div className="mb-3">
							<label for="exampleInputPassword1" className="form-label">Contraseña</label>
							<input
								type="password"
								className="form-control"
								name="password"
								value={user.password}
								onChange={handleChange}
								id="exampleInputPassword1" />
						</div>
						<button type="submit" className="btn btn-primary w-100">Submit</button>
					</form>
					<div className="col-12 d-flex justify-content-between">
						<Link to="/">
							<span className="btn btn-primary btn-sm mt-4" href="#" role="button">
								Volver
							</span>
						</Link>
						<Link to="/register">
							<span className="btn btn-primary btn-sm mt-4" href="#" role="button">
								Registrarme
							</span>
						</Link>
					</div>

				</div>
			</div>
		</div>

	);
};

