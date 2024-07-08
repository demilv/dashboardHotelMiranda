import { FormContainer } from "../../styledComponents/StyledForms";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editUser, conciergeDataSelect } from "../../features/conciergeOperations/conciergeSlice";

const EditUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const users = useSelector(conciergeDataSelect);

    const userToEdit = users.find(user => user.id === parseInt(userId, 10));

    const [formData, setFormData] = useState({
        id: userToEdit?.id,
        photo: userToEdit?.photo || "",
        name: userToEdit?.name || "",
        job: userToEdit?.job || "Manager",
        email: userToEdit?.email || "",
        phone: userToEdit?.phone || "",
        startDate: userToEdit?.startDate || "",
        responsibilities: userToEdit?.responsibilities || "",
        status: userToEdit?.status || "Yes",
        password: userToEdit?.password || ""
    });

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                id: userToEdit.id,
                photo: userToEdit.photo,
                name: userToEdit.name,
                job: userToEdit.job,
                email: userToEdit.email,
                phone: userToEdit.phone,
                startDate: userToEdit.startDate,
                responsibilities: userToEdit.responsibilities,
                status: userToEdit.status,
                password: userToEdit.password
            });
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editUser(formData));
        Swal.fire({
            title: "Good job!",
            text: "User updated successfully!",
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
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                <h4>Your Job</h4>
                <select name="job" value={formData.job} onChange={handleChange}>
                    <option>Manager</option>
                    <option>Reception</option>
                    <option>Room Service</option>
                </select>
                <h4>Your Email</h4>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                <h4>Your Phone number</h4>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                <h4>Start date</h4>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                <h4>Your responsibilities</h4>
                <input type="text" name="responsibilities" value={formData.responsibilities} onChange={handleChange} />
                <h4>Are you currently active?</h4>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <h4>Your password</h4>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
                <input type="submit" value="Update user" />
            </form>
        </FormContainer>
    );
};

export default EditUser;
