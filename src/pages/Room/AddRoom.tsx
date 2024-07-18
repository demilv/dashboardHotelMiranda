import { FormContainer, PairRadio, RadioBigContainer } from "../../styledComponents/StyledForms";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRoom, roomDataSelect } from "../../features/roomOperations/roomSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AppDispatch } from "../../app/store";
import { Room as RoomClass } from "../../features/Types/typeInterfaces";

const AddRoom: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const rooms: RoomClass[] = useSelector(roomDataSelect);   

    const getNextId = () => {
        const lastId = rooms.reduce((last, room) => (room.id > last ? room.id : last), 0);
        console.log(rooms)
        return lastId + 1;
    };

    const [id, setId] = useState<number>(getNextId)


    const [formData, setFormData] = useState({
        id: id,
        fotoLink: "",
        number: "",
        bedType: "Single bed",
        price: 0,
        offer: 0,
        discount: "",
        cancelPolicy: "",
        amenities: "",
        status: "Available"
    });
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
    
        if (name === "offer") {
            const offerValue = Number(value);
            const updatedOffer = offerValue > formData.price ? formData.price : offerValue;
    
            setFormData((prevData) => ({
                ...prevData,
                [name]: updatedOffer,
            }));
        } else if (type === "checkbox") {
            const isChecked = (e.target as HTMLInputElement).checked;
            const amenityValue = value;

            if (isChecked) {
                setFormData((prevData) => ({
                    ...prevData,
                    amenities: prevData.amenities ? prevData.amenities + ", " + amenityValue : amenityValue, 
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    amenities: prevData.amenities.split(" ").filter((amenity) => amenity !== amenityValue).join(" "), 
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
