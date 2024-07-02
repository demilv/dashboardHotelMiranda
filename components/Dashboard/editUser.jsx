import { FormContainer } from "../../styledComponents/StyledForms";
import React, {useContext, useState, useEffect} from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const EditUser = () =>{

    const navigate = useNavigate()

    const user = {
        name:"",
        pass:"",
        email:""
    }

    const [values, setValues] = useState(user);
    const { state, dispatch } = useContext(UserContext);
    
    useEffect(() => {
        if (state.user) {
          setValues({
            email: state.user.email,
            pass: state.user.pass,
            name: state.user.name 
          });
        }
      }, [state]);


    const edit = (e) =>{
        const {value, name} = e.target
        setValues({...values, [name]: value})
    }    

    const submitEditedUser= (ev) =>{
        ev.preventDefault();
        const {email, pass, name} = values
        dispatch({ type: 'SET_USERDATA', payload: {email, pass, name} });
        localStorage.setItem('user', JSON.stringify({email, pass, name}));
        console.log(state)
        navigate("/")
    }

    return(
        <FormContainer>
            <form onSubmit={submitEditedUser}>
                <h4>Your new Name</h4>
                <input type="text" name="name" onChange={edit} value={values.name}/>
                <h4>Your new Email</h4>
                <input type="email" name="email" onChange={edit} value={values.email}/>
                <h4>Your new Password</h4>
                <input type="password" name="pass" onChange={edit} value={values.pass}/>
                <input type="submit" value="New edited user"/>
            </form>
        </FormContainer>
    )
}

export default EditUser