import { CheckContainer, MainCheckContainer, CheckImg, CheckContainer2, CheckContainerImg } from "../../styledComponents/StyledCheckPages";
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { roomDataSelect } from "../../features/roomOperations/roomSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Room as RoomClass } from "../../features/Types/typeInterfaces";

const CheckRoom = () => {
    const navigate = useNavigate();
    const { roomId } = useParams<{roomId: string}>();
    const rooms: RoomClass[] = useSelector(roomDataSelect);

    const roomToCheck : RoomClass | undefined = rooms.find(room => room.id === parseInt(roomId!, 10));

    const roomData = {
        id: roomToCheck?.id,
        fotoLink: roomToCheck?.fotoLink || [],
        number: roomToCheck?.number || "",
        bedType: roomToCheck?.bedType || "",
        floor: roomToCheck?.floor || 0,
        price: roomToCheck?.price || 0,
        offer: roomToCheck?.offer || 0,
        status: roomToCheck?.status || true,
        amenities: roomToCheck?.amenities || "",
        cancelPolicy: roomToCheck?.cancelPolicy || ""
    };

    return (
        <>
            <MainCheckContainer>
                <CheckContainer>    
                    <h2>Room Number</h2>
                    <h4>{roomData.number}</h4>
                    <h2>Room type</h2>
                    <h4>{roomData.bedType}</h4>
                    <h2>Room floor</h2>
                    <h4>{roomData.floor}</h4>
                    <h2>Room price</h2>
                    <h4>{roomData.price}</h4>
                    <h2>Offer</h2>
                    <h4>{roomData.offer}</h4>
                    <h2>Status</h2>
                    <h4>{roomData.status}</h4>
                    <h2>Amenities</h2>
                    <h4>{roomData.amenities}</h4>
                    <h2>Cancel Policy</h2>
                    <h4>{roomData.cancelPolicy}</h4>
                </CheckContainer>
                <CheckContainer2>
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={true}
                    >
                        {Array.isArray(roomData.fotoLink) && roomData.fotoLink.map((url: string, index: number) => ( 
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