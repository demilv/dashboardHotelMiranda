import React from 'react'
import './Login.css'
import { useState } from "react";
import { useLocation } from "react-router-dom"

interface UserData {
    email: string;
    pass: string;
}

interface LoginProps {
    loginUser: (formData: UserData, prevRoute: string | null) => void;
}

const datos_user = {
    email: "",
    pass: ""
}

const Login: React.FC<LoginProps> = ({ loginUser }) => {    const location = useLocation()
    const { state } = location
    console.log(location)

    const [formData, setFormData] = useState(datos_user)
    
    const changeInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = ev.target;
        console.log(name, value)
        setFormData({ ...formData, [name]: value })
    }
    const submitForm = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        console.log("se han enviado los datos");
        loginUser(formData, state ? state.prevRoute : null)
        setFormData(datos_user);
    }

    return (<form className="form-container" onSubmit={submitForm}>
        <label htmlFor="email">
            Email
            <input type="email" name="email" id="email" onChange={changeInput} />
        </label>
        <label htmlFor="pass">
            Contraseña
            <input type="password" name="pass" id="pass" onChange={changeInput}
                value={formData.pass} />
        </label>
        <div>
            <button className="submit-bttn" type="submit">Log in</button>
        </div>
    </form>)
}
export default Login