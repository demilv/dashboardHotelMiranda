import React, { useState } from "react";
import { CajaDiv, CajaStyled, CajaMainContainer, CajaImg } from "./StyledCajasHome";
import { TextH5Light, TextNumberBig } from "../styledComponents/TextStyled";
import { LuBedDouble, LuCalendarCheck2 } from "react-icons/lu";
import { FaDoorOpen, FaDoorClosed } from "react-icons/fa6";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import roomReviews from '../../data/roomReview.json';
import RecentReviews from "../ReviewsSlider/RecentReviews";

const Home = () => {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxClick = (boxId) => {
        setSelectedBox(boxId);
    };

    const latestReviews = roomReviews.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    return (
        <>
            <CajaMainContainer>
                <CajaStyled onClick={() => handleBoxClick(1)}>
                    <CajaImg isSelected={selectedBox === 1}><LuBedDouble /></CajaImg>
                    <CajaDiv>
                        <TextNumberBig>8461</TextNumberBig>
                        <TextH5Light>New Booking</TextH5Light>
                    </CajaDiv>
                </CajaStyled>
                <CajaStyled onClick={() => handleBoxClick(2)}>
                    <CajaImg isSelected={selectedBox === 2}><LuCalendarCheck2 /></CajaImg>
                    <CajaDiv>
                        <TextNumberBig>963</TextNumberBig>
                        <TextH5Light>Scheduled Room</TextH5Light>
                    </CajaDiv>
                </CajaStyled>
                <CajaStyled onClick={() => handleBoxClick(3)}>
                    <CajaImg isSelected={selectedBox === 3}><FaDoorOpen /></CajaImg>
                    <CajaDiv>
                        <TextNumberBig>753</TextNumberBig>
                        <TextH5Light>Check In</TextH5Light>
                    </CajaDiv>
                </CajaStyled>
                <CajaStyled onClick={() => handleBoxClick(4)}>
                    <CajaImg isSelected={selectedBox === 4}><FaDoorClosed /></CajaImg>
                    <CajaDiv>
                        <TextNumberBig>516</TextNumberBig>
                        <TextH5Light>Check Out</TextH5Light>
                    </CajaDiv>
                </CajaStyled>
            </CajaMainContainer>

            <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={3}
                navigation={true}
            >
                {latestReviews.map(review => (
                    <SwiperSlide key={review.id}>
                        <RecentReviews 
                            review={review.review}
                            customerName={review.customerName}
                            date={review.date}
                        />
                    </SwiperSlide>
                ))}                
            </Swiper>
        </>
    );
};

export default Home;

