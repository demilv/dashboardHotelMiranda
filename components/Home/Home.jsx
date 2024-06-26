import React from "react";
import { CajaDiv, CajaStyled, CajaMainContainer } from "./cajasHome";
import { TextH5Light, TextNumberBig } from "../styledComponents/TextStyled";
import { LuBedDouble, LuCalendarCheck2  } from "react-icons/lu";
import { FaDoorOpen, FaDoorClosed } from "react-icons/fa6";

const Home = () => {


    return (
        <>
            <CajaMainContainer>
                <CajaStyled>
                    <LuBedDouble />
                    <CajaDiv>
                        <TextNumberBig>8461</TextNumberBig>
                        <TextH5Light>New Booking</TextH5Light>
                    </CajaDiv>
                </CajaStyled>
                <CajaStyled>
                    <LuCalendarCheck2 />
                    <CajaDiv>
                        <TextNumberBig>963</TextNumberBig>
                        <TextH5Light>Scheduled Room</TextH5Light>
                    </CajaDiv>
                </CajaStyled>
                <CajaStyled>
                    <FaDoorOpen />
                    <CajaDiv>
                        <TextNumberBig>753</TextNumberBig>
                        <TextH5Light>Check In</TextH5Light>
                    </CajaDiv>
                </CajaStyled>
                <CajaStyled>
                    <FaDoorClosed />
                    <CajaDiv>
                        <TextNumberBig>516</TextNumberBig>
                        <TextH5Light>Check Out</TextH5Light>
                    </CajaDiv>
                </CajaStyled>
            </CajaMainContainer>
        </>
    )
}

export default Home;