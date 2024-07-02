import { FormContainer } from "../../styledComponents/StyledForms";
import React, {createContext, useContext, useEffect} from "react";
import { UserContext } from "../../context/userContext";

const EditUser = () =>{

const {state} = useContext(UserContext)
useEffect(() => {
    console.log('Esto es el contxt:', state);
  }, [state]);

    return(
        <FormContainer>
            <form>
                <h4>Your new Name</h4>
                <input type="text" />
                <h4>Your new Email</h4>
                <input type="email" />
                <h4>Your new Password</h4>
                <input type="password"/>
                <input type="submit" value="New user"/>
            </form>
        </FormContainer>
    )
}

export default EditUser