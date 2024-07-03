import { FormContainer, PairRadio, RadioBigContainer } from "../../../styledComponents/StyledForms";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, roomDataSelect } from "../../../features/roomOperations/roomSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddRoom = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const rooms = useSelector(roomDataSelect);   

    const getNextId = () => {
        const lastId = rooms.reduce((last, room) => (room.id > last ? room.id : last), 0);
        console.log(rooms)
        return lastId + 1;
    };

    const [id, setId] = useState(getNextId)


    const [formData, setFormData] = useState({
        id: id,
        fotoLink: "",
        number: "",
        bedType: "Single bed",
        description: "",
        price: 0,
        offer: "No",
        discount: "",
        cancelPolicy: "",
        amenities: [],
    });
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        if (name === "offer" && formData.price < value) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: formData.price,
            }));
        } else if (type === "checkbox") {
            if (checked) {
                setFormData((prevData) => ({
                    ...prevData,
                    amenities: [...prevData.amenities, value],
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    amenities: prevData.amenities.filter((amenity) => amenity !== value),
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRoom(formData));
        Swal.fire({
            title: "Good job!",
            text: "Room added successfully!",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: true
        }).then(() => {
            navigate("/room");
        });
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h4>Room pics</h4>
                <input type="file" name="fotoLink" onChange={handleChange} />
                <h4>Room Number</h4>
                <input type="text" name="number" onChange={handleChange} />
                <h4>Room type</h4>
                <select name="bedType" onChange={handleChange}>
                    <option>Single bed</option>
                    <option>Double bed</option>
                    <option>Double superior</option>
                    <option>Suite</option>
                </select>
                <h4>Room description</h4>
                <input type="text" name="description" onChange={handleChange} />
                <h4>Room price</h4>
                <input type="number" name="price" onChange={handleChange} />
                <h4>Is there a discount?</h4>
                <select name="discount" onChange={handleChange}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <h4>Offer</h4>
                <input type="number" name="offer" onChange={handleChange} disabled={formData.discount === "No"}/>
                <h4>Cancel policy</h4>
                <input type="text" name="cancelPolicy" onChange={handleChange} />
                <h4>Amenities</h4>
                <RadioBigContainer>
                    <PairRadio>
                        <label>AC</label>
                        <input type="checkbox" value="AC" onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Shower</label>
                        <input type="checkbox" value="Shower" onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Double Bed</label>
                        <input type="checkbox" value="Double Bed" onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Towel</label>
                        <input type="checkbox" value="Towel" onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Bathup</label>
                        <input type="checkbox" value="Bathup" onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Coffee Set</label>
                        <input type="checkbox" value="Coffee Set" onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>LED TV</label>
                        <input type="checkbox" value="LED TV" onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Wifi</label>
                        <input type="checkbox" value="Wifi" onChange={handleChange} />
                    </PairRadio>
                </RadioBigContainer>
                <input type="submit" value="New room" />
            </form>
        </FormContainer>
    );
};

export default AddRoom;
