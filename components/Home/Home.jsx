import React, { useState } from "react";
import { CajaDiv, CajaStyled, CajaMainContainer, CajaImg } from "./cajasHome";
import { TextH5Light, TextNumberBig } from "../styledComponents/TextStyled";
import { LuBedDouble, LuCalendarCheck2 } from "react-icons/lu";
import { FaDoorOpen, FaDoorClosed } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import './sliderHome.css'

const Home = () => {
    const [selectedBox, setSelectedBox] = useState(null);

    const handleBoxClick = (boxId) => {
        setSelectedBox(boxId);
    };

    const swiper = new Swiper('.swiper1', {  
        direction: 'horizontal',
        loop: true,  
      
        navigation: {
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1',
        },  
      });

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

            <article className="sectionSlider">
                <div className="swiper swiper1">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">                      
                            <div className="reviewContainer">                            
                                <p className="reviewContainerP">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                <div className="reviewContainerInside">
                                    <div className="reviewContainerInside2">
                                        <h3 className="reviewContainerInside2Nombre">Nombre</h3>
                                        <h6 className="reviewContainerInside2Time">Time</h6>
                                    </div>
                                    <div className="reviewContainerInside3">
                                        <IoIosCheckmarkCircleOutline className= "circleLeft"/>
                                        <MdOutlineCancel />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">                      
                            <div className="reviewContainer">                            
                                <p className="reviewContainerP">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                <div className="reviewContainerInside">
                                    <div className="reviewContainerInside2">
                                        <h3 className="reviewContainerInside2Nombre">Nombre</h3>
                                        <h6 className="reviewContainerInside2Time">Time</h6>
                                    </div>
                                    <div className="reviewContainerInside3">
                                        <IoIosCheckmarkCircleOutline className= "circleLeft"/>
                                        <MdOutlineCancel />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">                      
                            <div className="reviewContainer">                            
                                <p className="reviewContainerP">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                <div className="reviewContainerInside">
                                    <div className="reviewContainerInside2">
                                        <h3 className="reviewContainerInside2Nombre">Nombre</h3>
                                        <h6 className="reviewContainerInside2Time">Time</h6>
                                    </div>
                                    <div className="reviewContainerInside3">
                                        <IoIosCheckmarkCircleOutline className= "circleLeft"/>
                                        <MdOutlineCancel />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="swiper-slide">                      
                            <div className="reviewContainer">                            
                                <p className="reviewContainerP">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                <div className="reviewContainerInside">
                                    <div className="reviewContainerInside2">
                                        <h3 className="reviewContainerInside2Nombre">Nombre</h3>
                                        <h6 className="reviewContainerInside2Time">Time</h6>
                                    </div>
                                    <div className="reviewContainerInside3">
                                        <IoIosCheckmarkCircleOutline className= "circleLeft"/>
                                        <MdOutlineCancel />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-button-prev swiper-button-prev1"></div>
                    <div className="swiper-button-next swiper-button-next1"></div>
                </div>
        </article>        
        </>
    );
};

export default Home;
