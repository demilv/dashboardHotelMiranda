import React, { useState, useEffect } from "react";
import bookingsData from "../../data/bookingsData.json"
import { ButtonNewRoom, ButtonSort, ButtonNextBack, ButtonPage, ButtonUnseen} from "../../styledComponents/StyledButton";
import { TableColumnFlexMain, TableColumnMain, TableContainIdName, TableFirstRow, TableIdNameContainer, TableImg, TableRoomData, TableRow } from "../../styledComponents/StyledTabla";
import { TextColorful } from "../../styledComponents/TextStyled";

const Booking = () => {
    const [active, setActive] = useState("All")
    const [sorting, setSorting] = useState("id")
    const [page, setPage] = useState(0)
    const [sortedBookings, setSortedBookings] = useState([])
    const [bookingsMostrar, setBookingsMostrar] = useState([])
    const [isDisabledBack, setIsDisabledBack] = useState()
    const [isDisabledNext, setIsDisabledNext] = useState()
    const [maxPages, setMaxPages] = useState(Math.floor(bookingsData.length / 10))

    const big1 = "big1"
    const big2 = "big2"
    const first = "first"

    const getStatusColor = (status) => {
        switch (status) {
          case 'Check In':
            return 'green';
          case 'Check Out':
            return 'red';
          case 'In Progress':
            return 'yellow';
          default:
            return 'grey';
        }
      };
      

    const handlePageClick = (index) =>{
        setPage(index)
    }

    const handleChangeSort = (type) =>{
        setSorting(type)
    }

    useEffect(() => {
        let filteredBookings = bookingsData;

        if (active === "checkingIn") {
            filteredBookings = filteredBookings.filter(booking => booking.status === "Check In");
        } else if (active === "checkingOut") {
            filteredBookings = filteredBookings.filter(booking => booking.status === "Check Out");
        } else if (active === "inProgress") {
            filteredBookings = filteredBookings.filter(booking => booking.status === "In Progress");
        }

        filteredBookings.sort((a, b) => {
            if (a[sorting] < b[sorting]) return -1;
            if (a[sorting] > b[sorting]) return 1;
            return 0;
        });

        setSortedBookings(filteredBookings);
        setPage(0);

        setMaxPages(Math.floor(filteredBookings.length / 10));
    }, [sorting, active]);

      useEffect(() => {        
        const registros = page*10;
        setBookingsMostrar (sortedBookings.slice(registros, registros+10))
      }, [page, sortedBookings, sorting, active]);

      useEffect(() =>{
        if (page === 0){
            setIsDisabledBack(true)
            setIsDisabledNext(false)
            if(page === maxPages){
                setIsDisabledNext(true)
            }
        }else if(page === maxPages){
            setIsDisabledBack(false)
            setIsDisabledNext(true)
        }else{
            setIsDisabledBack(false)
            setIsDisabledNext(false)
        }
      }, [page,  sortedBookings])



    return (
        <>      
            <TableFirstRow>
                <TableRow first={first}>
                    <ButtonSort active={active === "All"} onClick={() => setActive("All")}>All Bookings</ButtonSort>
                    <ButtonSort active={active === "checkingIn"} onClick={() => setActive("checkingIn")}>Checking In</ButtonSort>
                    <ButtonSort active={active === "checkingOut"} onClick={() => setActive("checkingOut")}>Checking Out</ButtonSort>
                    <ButtonSort active={active === "inProgress"} onClick={() => setActive("inProgress")}>In Progress</ButtonSort>
                    {/*Aqui pondria un buscador de booking*/}
                </TableRow>
                <ButtonNewRoom>+ New Booking</ButtonNewRoom>
            </TableFirstRow>
            <TableRoomData>
                <TableRow>
                    <TableColumnMain big={big1}><ButtonUnseen onClick={()=> handleChangeSort("guest")}>Guest</ButtonUnseen></TableColumnMain>
                    <TableColumnMain big={big1}><ButtonUnseen onClick={()=> handleChangeSort("order_date")}>Order Date</ButtonUnseen></TableColumnMain>
                    <TableColumnMain><ButtonUnseen onClick={()=> handleChangeSort("checkIn_date")}>Check in</ButtonUnseen></TableColumnMain>
                    <TableColumnMain><ButtonUnseen onClick={()=> handleChangeSort("checkOut_date")}>Check out</ButtonUnseen></TableColumnMain>
                    <TableColumnMain>Special Request</TableColumnMain>
                    <TableColumnMain>Room Type</TableColumnMain>
                    <TableColumnMain>Status</TableColumnMain>
                </TableRow>
                {bookingsMostrar.map(booking => (
                    <TableRow key={booking.id}>
                        <TableColumnFlexMain>
                            <TableImg src={booking.fotoLink} alt={`Room ${booking.number}`}/>
                            <TableContainIdName>
                                <TableIdNameContainer>
                                    {booking.guest}
                                </TableIdNameContainer>
                                <TableIdNameContainer>
                                    #{booking.id}
                                </TableIdNameContainer>
                            </TableContainIdName>
                        </TableColumnFlexMain>
                        <TableColumnMain>{booking.orderDate}</TableColumnMain>
                        <TableColumnMain>{booking.checkInDate}</TableColumnMain>
                        <TableColumnMain>{booking.checkOutDate}</TableColumnMain>
                        <TableColumnMain>View Notes</TableColumnMain>
                        <TableColumnMain>Deluxe - {booking.id}</TableColumnMain>
                        <TableColumnMain><TextColorful color={getStatusColor(booking.status)}>{booking.status}</TextColorful></TableColumnMain>
                    </TableRow>
                ))}         
            </TableRoomData>  
            <ButtonNextBack first={first} onClick={() =>setPage(page-1)} disabled={isDisabledBack}>Back</ButtonNextBack>
            {Array.from({ length: maxPages + 1 }, (_, index) => (
                    <ButtonPage key={index} active={index === page}  onClick={() => handlePageClick(index)}>{index + 1}</ButtonPage>
                ))}
            <ButtonNextBack onClick={() =>setPage(page+1)} disabled={isDisabledNext}>Next</ButtonNextBack>         
        </>
    )
}

export default Booking