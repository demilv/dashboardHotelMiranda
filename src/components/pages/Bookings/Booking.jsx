import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ButtonNewRoom, ButtonSort, ButtonNextBack, ButtonPage, ButtonUnseen, ButtonGreen} from "../../../styledComponents/StyledButton";
import { TableColumnFlexMain, TableColumnMain, TableContainIdName, TableFirstRow, TableIdNameContainer, TableImg, TableRoomData, TableRow } from "../../../styledComponents/StyledTabla";
import { TextColorful } from "../../../styledComponents/TextStyled";
import Popup from "../../Popup/Popup";
import { bookingsDataSelect, bookingsStatusSelect, bookingsErrorSelect, deleteBooking, editBooking } from "../../../features/bookingsOperations/bookingsSlice";
import { BookingsThunk } from "../../../features/bookingsOperations/bookingsThunk";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const Booking = () => {
    const [active, setActive] = useState("All")
    const [sorting, setSorting] = useState("id")
    const [page, setPage] = useState(0)
    const [sortedBookings, setSortedBookings] = useState([])
    const [bookingsMostrar, setBookingsMostrar] = useState([])
    const [isDisabledBack, setIsDisabledBack] = useState()
    const [isDisabledNext, setIsDisabledNext] = useState()
    const [maxPages, setMaxPages] = useState()
    const dispatch = useDispatch();
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState("");
    const bookingsDataSinMapear = useSelector(bookingsDataSelect);
    const bookingsStatus = useSelector(bookingsStatusSelect);
    const bookingsError = useSelector(bookingsErrorSelect);
    const [loading, setLoading] = useState(true);
    const [bookingsData, setBookingsData] = useState([]);


    const big1 = "big1"
    const big2 = "big2"
    const first = "first"
    const navigate = useNavigate();

    const editBooking = (bookingId) => {
        navigate(`/editBooking/${bookingId}`);
    };

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
        if (bookingsMostrar.length === 0) {
            if (bookingsStatus === "idle") {
                dispatch(BookingsThunk());
            } else if (bookingsStatus === "pending") {
                setLoading(true);
            } else if (bookingsStatus === "fulfilled") {
                setLoading(false);
                let bookingsDataMapeado = [];
                bookingsDataSinMapear.forEach((booking) => {
                    bookingsDataMapeado.push({ fotoLink: booking.fotoLink, id: booking.id, guest: booking.guest, orderDate: booking.orderDate, checkInDate: booking.checkInDate, checkOut: booking.checkOut, specialRequest: booking.specialRequest,status: booking.status });
                });
                setBookingsData(bookingsDataMapeado);
                setMaxPages(Math.ceil(bookingsDataMapeado.length / 10));
            } else if (bookingsStatus === "rejected") {
                setLoading(false);
                console.log(bookingsError);
            }
        }
    }, [bookingsStatus, bookingsDataSinMapear, bookingsError]);

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

        const newMaxPages = Math.ceil(filteredBookings.length / 10);
        setMaxPages(newMaxPages);
    }, [sorting, active, bookingsData]);

      useEffect(() => {        
        const registros = page*10;
        setBookingsMostrar (sortedBookings.slice(registros, registros+10))
      }, [page, sortedBookings, sorting, active]);

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
      }, [page,  sortedBookings])

    const handleSpecialRequest = (specialRequest) => {
    setSelectedRequest(specialRequest);
    setPopupVisible(true);
    };

    const closePopup = () => {
    setPopupVisible(false);
    setSelectedRequest("");
    };

    const handleDeleteBooking = (bookingId) => {
        dispatch(deleteBooking(bookingId));
        const updatedBookingsData = bookingsData.filter(booking => booking.id !== bookingId);
        setBookingsData(updatedBookingsData);
    };


    return (
        <>     
            {loading ? (
                <p>wait a moment please</p>
            ) : (
                <> 
                    <TableFirstRow>
                        <TableRow first={first}>
                            <ButtonSort active={active === "All"} onClick={() => setActive("All")}>All Bookings</ButtonSort>
                            <ButtonSort active={active === "checkingIn"} onClick={() => setActive("checkingIn")}>Checking In</ButtonSort>
                            <ButtonSort active={active === "checkingOut"} onClick={() => setActive("checkingOut")}>Checking Out</ButtonSort>
                            <ButtonSort active={active === "inProgress"} onClick={() => setActive("inProgress")}>In Progress</ButtonSort>
                        </TableRow>
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
                                <TableColumnMain><ButtonGreen onClick={() => handleSpecialRequest(booking.specialRequest)}>View Notes</ButtonGreen></TableColumnMain>
                                <TableColumnMain>Deluxe - {booking.id}</TableColumnMain>
                                <TableColumnMain><TextColorful color={getStatusColor(booking.status)}>{booking.status}</TextColorful></TableColumnMain>
                                <TableColumnMain><FaTrashAlt onClick={() => handleDeleteBooking(booking.id)}/><FaPencil onClick={() => editBooking(booking.id)}/></TableColumnMain>
                            </TableRow>
                        ))}         
                    </TableRoomData>  
                    <ButtonNextBack first={first} onClick={() =>setPage(page-1)} disabled={isDisabledBack}>Back</ButtonNextBack>
                    {Array.from({ length: maxPages }, (_, index) => (
                            <ButtonPage key={index+1} active={index === page}  onClick={() => handlePageClick(index)}>{index + 1}</ButtonPage>
                        ))}
                    <ButtonNextBack onClick={() =>setPage(page+1)} disabled={isDisabledNext}>Next</ButtonNextBack>  
                    {popupVisible && <Popup specialRequest={selectedRequest} onClose={closePopup} />}   
                    </>
            )}    
        </>
    )
}

export default Booking