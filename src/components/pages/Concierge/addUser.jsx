import { FormContainer } from "../../../styledComponents/StyledForms";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, conciergeDataSelect } from "../../../features/conciergeOperations/conciergeSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(conciergeDataSelect);

    const getNextId = () => {
        const lastId = users.reduce((last, user) => (user.id > last ? user.id : last), 0);
        return lastId + 1;
    };

    const [id, setId] = useState(getNextId);

    const [formData, setFormData] = useState({
        id: id,
        photo: "",
        name: "",
        job: "Manager",
        email: "",
        phone: "",
        startDate: "",
        responsibilities: "",
        status: "Yes",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData));
        Swal.fire({
            title: "Good job!",
            text: "User added successfully!",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true
        }).then(() => {
            navigate("/concierge");
        });
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h4>Your Image</h4>
                <input type="file" name="photo" onChange={handleChange} />
                <h4>Your Name</h4>
                <input type="text" name="name" onChange={handleChange} />
                <h4>Your Job</h4>
                <select name="job" onChange={handleChange}>
                    <option>Manager</option>
                    <option>Reception</option>
                    <option>Room Service</option>
                </select>
                <h4>Your Email</h4>
                <input type="email" name="email" onChange={handleChange} />
                <h4>Your Phone number</h4>
                <input type="text" name="phone" onChange={handleChange} />
                <h4>Start date</h4>
                <input type="date" name="startDate" onChange={handleChange} />
                <h4>Your responsibilities</h4>
                <input type="text" name="responsibilities" onChange={handleChange} />
                <h4>Are you currently active?</h4>
                <select name="status" onChange={handleChange}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <h4>Your password</h4>
                <input type="password" name="password" onChange={handleChange} />
                <input type="submit" value="New user" />
            </form>
        </FormContainer>
    );
};

export default AddUser;
