import { FormContainer } from "../../styledComponents/StyledForms";
import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const EditUserOnContext = () : React.JSX.Element => {

    const navigate = useNavigate()

    const user = {
        name:"",
        pass:"",
        email:""
    }

    const [values, setValues] = useState(user);
    const userContext = useContext(UserContext);

    useEffect(() => {
        if (userContext?.state.user) {
            setValues({
                email: userContext.state.user.email || "",
                pass: userContext.state.user.pass || "",
                name: userContext.state.user.name || ""
            });
        }
    }, [userContext]);


    const edit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {value, name} = e.target
        setValues({...values, [name]: value})
    }    

    const submitEditedUser= (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const {email, pass, name} = values
        if (userContext) {
            userContext.dispatch({ type: 'SET_USERDATA', payload: { email, pass, name } });
            localStorage.setItem('user', JSON.stringify({ email, pass, name }));
            console.log(userContext.state);
        }
        navigate("/home")
    }

    return(
        <FormContainer>
            <form onSubmit={submitEditedUser}>
                <h4>Your new Name</h4>
                <input type="text" name="name" onChange={edit} value={values.name}/>
                <h4>Your new Email</h4>
                <input type="email" name="email" onChange={edit} value={values.email}/>
                <h4>Your new Password</h4>
                <input type="password" name="pass" onChange={edit} />
                <input type="submit" value="New edited user"/>
            </form>
        </FormContainer>
    )
}

export default EditUserOnContext