import React,{useState,useContext} from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const initialUser = {
    name :"",
    email:"",
    password:""
}


const Register = () => {
    const [user,setUser] = useState(initialUser)
    const { actions } = useContext(Context)
    const navigate = useNavigate()

    const handleChange = ({target}) => {
        setUser({
            ...user,
            [target.name]:target.value
        })
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        const response = await actions.register(user)

        if (response == 201){
            navigate("/login")
        }else if (response == 400){
            alert('wrong credentials')
        }
    } 

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h1 className="text-center">Registrate en nuestra pagina</h1>
                <div className="col-12 col-md-6 border p-3 mt-3">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Nombre Completo</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="name"
                                onChange={handleChange}
                                value={user.name}/>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Correo</label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                aria-describedby="emailHelp"/>
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
                </div>
            </div>
        </div>
    )


}

export default Register