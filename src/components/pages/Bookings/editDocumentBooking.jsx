import { FormContainer } from "../../../styledComponents/StyledForms";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editBooking, bookingsDataSelect } from "../../../features/bookingsOperations/bookingsSlice";

const EditDocumentBooking = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bookingId } = useParams();
    const bookings = useSelector(bookingsDataSelect);

    const bookingToEdit = bookings.find(booking => booking.id === parseInt(bookingId, 10));

    const [formData, setFormData] = useState({
        id: bookingToEdit?.id,
        fotoLink: bookingToEdit?.fotoLink || "",
        guest: bookingToEdit?.guest || "",
        orderDate: bookingToEdit?.orderDate || "",
        checkInDate: bookingToEdit?.checkInDate || "",
        checkOutDate: bookingToEdit?.checkOutDate || "",
        specialRequest: bookingToEdit?.specialRequest || "",
        status: bookingToEdit?.status || "In Progress",
    });

    useEffect(() => {
        if (bookingToEdit) {
            setFormData({
                id: bookingToEdit.id,
                fotoLink: bookingToEdit.fotoLink,
                guest: bookingToEdit.guest,
                orderDate: bookingToEdit.orderDate,
                checkInDate: bookingToEdit.checkInDate,
                checkOutDate: bookingToEdit.checkOutDate,
                specialRequest: bookingToEdit.specialRequest,
                status: bookingToEdit.status,
            });
        }
    }, [bookingToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editBooking(formData));
        Swal.fire({
            title: "Good job!",
            text: "Booking updated successfully!",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true
        }).then(() => {
            navigate("/booking");
        });
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h4>Guest</h4>
                <input type="text" name="guest" value={formData.guest} onChange={handleChange} />
                <h4>Order Date</h4>
                <input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} />
                <h4>Check-in Date</h4>
                <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} />
                <h4>Check-out Date</h4>
                <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} />
                <h4>Special Request</h4>
                <input type="text" name="specialRequest" value={formData.specialRequest} onChange={handleChange} />
                <h4>Status</h4>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option>In Progress</option>
                    <option>Check In</option>
                    <option>Check Out</option>
                </select>
                <input type="submit" value="Update Booking" />
            </form>
        </FormContainer>
    );
};

export default EditDocumentBooking;
