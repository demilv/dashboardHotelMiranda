import { FormContainer, PairRadio, RadioBigContainer } from "../../styledComponents/StyledForms";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { editRoom, roomDataSelect } from "../../features/roomOperations/roomSlice";
import { AppDispatch } from "../../app/store";
import { Room as RoomClass } from "../../features/Types/typeInterfaces";

const EditRoom = () : React.JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { roomId } = useParams();
    const rooms: RoomClass[] = useSelector(roomDataSelect);

    const roomToEdit = rooms.find(room => room.id === parseInt(roomId!, 10));

    const [formData, setFormData] = useState({
        id: roomToEdit?.id,
        fotoLink: roomToEdit?.fotoLink || "",
        number: roomToEdit?.number || "",
        bedType: roomToEdit?.bedType || "",
        price: roomToEdit?.price || 0,
        offer: roomToEdit?.offer || 0,
        discount: "",
        cancelPolicy: roomToEdit?.cancelPolicy || "",
        amenities: roomToEdit?.amenities || "",
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
        const roomNumber = parseInt(formData.number, 10);
        const floor = Math.floor(roomNumber / 10);
        const formDataFinal = {
            ...formData,
            floor: floor,
        };
        dispatch(editRoom(formDataFinal));        
        Swal.fire({
            title: "Good job!",
            text: "Room updated successfully!",
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
                <input type="text" name="number" value={formData.number} onChange={handleChange} />
                <h4>Room type</h4>
                <select name="bedType" value={formData.bedType} onChange={handleChange}>
                    <option>Single bed</option>
                    <option>Double bed</option>
                    <option>Double superior</option>
                    <option>Suite</option>
                </select>
                <h4>Room price</h4>
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
                <h4>Is there a discount?</h4>
                <select name="discount" value={formData.discount} onChange={handleChange}>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <h4>Offer</h4>
                <input type="number" name="offer" value={formData.offer} onChange={handleChange} disabled={formData.discount === "No"} />
                <h4>Cancel policy</h4>
                <input type="text" name="cancelPolicy" value={formData.cancelPolicy} onChange={handleChange} />
                <h4>Amenities</h4>
                <RadioBigContainer>
                    <PairRadio>
                        <label>AC</label>
                        <input type="checkbox" value="AC" checked={formData.amenities.includes("AC")} onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Shower</label>
                        <input type="checkbox" value="Shower" checked={formData.amenities.includes("Shower")} onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Double Bed</label>
                        <input type="checkbox" value="Double Bed" checked={formData.amenities.includes("Double Bed")} onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Towel</label>
                        <input type="checkbox" value="Towel" checked={formData.amenities.includes("Towel")} onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Bathup</label>
                        <input type="checkbox" value="Bathup" checked={formData.amenities.includes("Bathup")} onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Coffee Set</label>
                        <input type="checkbox" value="Coffee Set" checked={formData.amenities.includes("Coffee Set")} onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>LED TV</label>
                        <input type="checkbox" value="LED TV" checked={formData.amenities.includes("LED TV")} onChange={handleChange} />
                    </PairRadio>
                    <PairRadio>
                        <label>Wifi</label>
                        <input type="checkbox" value="Wifi" checked={formData.amenities.includes("Wifi")} onChange={handleChange} />
                    </PairRadio>
                </RadioBigContainer>
                <input type="submit" value="Update room" />
            </form>
        </FormContainer>
    );
};

export default EditRoom;