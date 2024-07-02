import { FormContainer } from "../../styledComponents/StyledForms";
import React from "react";

const AddUser = () =>{


    return(
        <FormContainer>
            <form>
                <h4>Your Image</h4>
                <input type="file" />
                <h4>Your Name</h4>
                <input type="text" />
                <h4>Your Job</h4>
                <select>
                    <option>Manager</option>
                    <option>Reception</option>
                    <option>Room Service</option>
                </select>
                <h4>Your Email</h4>
                <input type="email" />
                <h4>Your Phone number</h4>
                <input type="text"/>
                <h4>Start date</h4>
                <input type="date"/>
                <h4>Your responsibilities</h4>
                <input type="text"/>
                <h4>Are you currently active?</h4>
                <select>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <h4>Your password</h4>
                <input type="password"/>
                <input type="submit" value="New user"/>
            </form>
        </FormContainer>
    )
}

export default AddUser