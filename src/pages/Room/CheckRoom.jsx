import { CheckContainer, MainCheckContainer, CheckImg, CheckContainer2, CheckContainerImg } from "../../styledComponents/StyledCheckPages";
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { roomDataSelect } from "../../features/roomOperations/roomSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const CheckRoom = () => {
    const navigate = useNavigate();
    const { roomId } = useParams();
    const rooms = useSelector(roomDataSelect);

    const roomToCheck = rooms.find(room => room.id === parseInt(roomId, 10));

    const roomData = {
        id: roomToCheck?.id,
        fotoLink: roomToCheck?.fotoLink || [],
        number: roomToCheck?.number || "",
        bedType: roomToCheck?.bedType || "",
        description: roomToCheck?.description || "",
        price: roomToCheck?.price || 0,
        offer: roomToCheck?.offer || 0,
        cancelPolicy: roomToCheck?.cancelPolicy || "",
        amenities: roomToCheck?.amenities || [],
    };

    return (
        <>
            <MainCheckContainer>
                <CheckContainer>    
                    <h2>Room Number</h2>
                    <h4>{roomData.number}</h4>
                    <h2>Room type</h2>
                    <h4>{roomData.bedType}</h4>
                    <h2>Room description</h2>
                    <h4>{roomData.description}</h4>
                    <h2>Room price</h2>
                    <h4>{roomData.price}</h4>
                    <h2>Offer</h2>
                    <h4>{roomData.offer}</h4>
                    <h2>Cancel policy</h2>
                    <h4>{roomData.cancelPolicy}</h4>
                    <h2>Amenities</h2>
                    <h4>{roomData.amenities}</h4>
                </CheckContainer>
                <CheckContainer2>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={true}
                    >
                        {roomData.fotoLink.map((url, index) => (  
                            <SwiperSlide key={index} >
                                <CheckContainerImg>
                                    <CheckImg src={url} />
                                </CheckContainerImg>
                            </SwiperSlide>
                        ))}         
                    </Swiper>
                </CheckContainer2>
            </MainCheckContainer>
        </>
    );
};

export default CheckRoom;