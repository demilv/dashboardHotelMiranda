import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import roomReviews from '../../../data/roomReview.json';
import RecentReviews from "../../ReviewsSlider/RecentReviews";
import { ButtonNewRoom, ButtonSort, ButtonNextBack, ButtonPage, ButtonUnseen} from "../../../styledComponents/StyledButton";
import { TableColumnFlexMain, TableColumnMain, TableContainIdName, TableFirstRow, TableIdNameContainer, TableImg, TableRoomData, TableRow } from "../../../styledComponents/StyledTabla";
import { IoMdStar } from "react-icons/io";


const Reviews= () => {

    const [active, setActive] = useState("All Contacts")
    const [sorting, setSorting] = useState("date")
    const [page, setPage] = useState(0)
    const [sortedReviews, setSortedReviews] = useState([])
    const [reviewsMostrar, setReviewsMostrar] = useState([])
    const [isDisabledBack, setIsDisabledBack] = useState()
    const [isDisabledNext, setIsDisabledNext] = useState()
    const [maxPages, setMaxPages] = useState(Math.ceil(roomReviews.length / 10))

    const latestReviews = roomReviews.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    const big1 = "big1"
    const big2 = "big2"
    const first = "first"

    const handlePageClick = (index) =>{
        setPage(index)
    }

    const handleChangeSort = (type) =>{
        setSorting(type)
    }

    useEffect(() => {
        let filteredReviews = roomReviews;
        if (active === "Archived") {
            filteredReviews = filteredReviews.filter(review => !review.status);
        }

        filteredReviews.sort((a, b) => {
            if (a[sorting] < b[sorting]) return -1;
            if (a[sorting] > b[sorting]) return 1;
            return 0;
        });

        setSortedReviews(filteredReviews);
        setPage(0);

        const newMaxPages = Math.ceil(filteredReviews.length / 10);
        setMaxPages(newMaxPages);
    }, [sorting, active]);

      useEffect(() => {        
        const registros = page*10;
        setReviewsMostrar (sortedReviews.slice(registros, registros+10))
      }, [page, sortedReviews, sorting, active]);

      useEffect(() =>{
        if (page === 0){
            setIsDisabledBack(true)
            setIsDisabledNext(false)
            if(page+1 === maxPages){
                setIsDisabledNext(true)
            }
        }else if(page+1 === maxPages){
            setIsDisabledBack(false)
            setIsDisabledNext(true)
        }else{
            setIsDisabledBack(false)
            setIsDisabledNext(false)
        }
      }, [page, sortedReviews])

      const generateStars = (stars) => {
        const starsArray = [];
        for (let i = 0; i < stars; i++) {
            starsArray.push(<IoMdStar key={i} />);
        }
        return starsArray;
        }

       const actionButton = (status) =>{
        if (status === true){        
            return <ButtonUnseen color={"red"}>Archive</ButtonUnseen>
        }else{
            return <ButtonUnseen color={"green"}>Publish</ButtonUnseen>
        }
       }

    return (
        <>
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

            <TableFirstRow>
                <TableRow first={first}>
                    <ButtonSort active={active === "All Contacts"} onClick={() => setActive("All Contacts")}>All Contacts</ButtonSort>
                    <ButtonSort active={active === "Archived"} onClick={() => setActive("Archived")}>Archived</ButtonSort>
                </TableRow>
            </TableFirstRow>
            <TableRoomData>
                <TableRow>
                    <TableColumnMain big={big1}><ButtonUnseen onClick={()=> handleChangeSort("id")}>Order Id</ButtonUnseen></TableColumnMain>
                    <TableColumnMain><ButtonUnseen onClick={()=> handleChangeSort("id")}>Date</ButtonUnseen></TableColumnMain>
                    <TableColumnMain>Customer</TableColumnMain>
                    <TableColumnMain big={big2}>Comment</TableColumnMain>
                    <TableColumnMain>Action</TableColumnMain>
                </TableRow>
                {reviewsMostrar.map(review => (
                    <TableRow key={review.id}>                        
                        <TableColumnMain>{review.id}</TableColumnMain>
                        <TableColumnMain>{review.date}{review.hora}</TableColumnMain>
                        <TableColumnMain big={big2}>{review.customerName} {review.email}</TableColumnMain>
                        <TableColumnMain>{generateStars(review.stars)}{review.review}</TableColumnMain>
                        <TableColumnMain>{actionButton(review.status)}</TableColumnMain>
                    </TableRow>
                ))}         
            </TableRoomData>  
            <ButtonNextBack first={first} onClick={() =>setPage(page-1)} disabled={isDisabledBack}>Back</ButtonNextBack>
            {Array.from({ length: maxPages }, (_, index) => (
                    <ButtonPage key={index+1} active={index === page}  onClick={() => handlePageClick(index)}>{index + 1}</ButtonPage>
                ))}
            <ButtonNextBack onClick={() =>setPage(page+1)} disabled={isDisabledNext}>Next</ButtonNextBack>  
        </>
    )
}

export default Reviews