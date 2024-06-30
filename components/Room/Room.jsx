import React, { useState, useEffect } from "react";
import roomData from "../../data/roomData.json"
import { ButtonNewRoom, ButtonSort, ButtonNextBack, ButtonPage, ButtonUnseen} from "../../styledComponents/StyledButton";
import { TableColumnFlexMain, TableColumnMain, TableContainIdName, TableFirstRow, TableIdNameContainer, TableImg, TableRoomData, TableRow } from "../../styledComponents/StyledTabla";

const Room = () => {
    const [active, setActive] = useState("All")
    const [sorting, setSorting] = useState("id")
    const [page, setPage] = useState(0)
    const [sortedRooms, setSortedRooms] = useState([])
    const [roomsMostrar, setRoomsMostrar] = useState([])
    const [isDisabledBack, setIsDisabledBack] = useState()
    const [isDisabledNext, setIsDisabledNext] = useState()
    const [maxPages, setMaxPages] = useState(Math.ceil(roomData.length / 10))

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
        let filteredRooms = roomData;

        if (active === "Available") {
            filteredRooms = filteredRooms.filter(room => room.status);
        } else if (active === "Not available") {
            filteredRooms = filteredRooms.filter(room => !room.status);
        }

        filteredRooms.sort((a, b) => {
            if (a[sorting] < b[sorting]) return -1;
            if (a[sorting] > b[sorting]) return 1;
            return 0;
        });

        setSortedRooms(filteredRooms);
        setPage(0);

        const newMaxPages = Math.ceil(filteredRooms.length / 10);
        setMaxPages(newMaxPages);
    }, [sorting, active]);

      useEffect(() => {        
        const registros = page*10;
        setRoomsMostrar (sortedRooms.slice(registros, registros+10))
      }, [page, sortedRooms, sorting, active]);

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
      }, [page, sortedRooms])



    return (
        <>      
            <TableFirstRow>
                <TableRow first={first}>
                    <ButtonSort active={active === "All"} onClick={() => setActive("All")}>All</ButtonSort>
                    <ButtonSort active={active === "Available"} onClick={() => setActive("Available")}>Available</ButtonSort>
                    <ButtonSort active={active === "Not available"} onClick={() => setActive("Not available")}>Not available</ButtonSort>
                </TableRow>
                <ButtonNewRoom>+ New Room</ButtonNewRoom>
            </TableFirstRow>
            <TableRoomData>
                <TableRow>
                    <TableColumnMain big={big1}><ButtonUnseen onClick={()=> handleChangeSort("id")}>Room Name</ButtonUnseen></TableColumnMain>
                    <TableColumnMain>Room Type</TableColumnMain>
                    <TableColumnMain>Room Floor</TableColumnMain>
                    <TableColumnMain big={big2}>Amenities</TableColumnMain>
                    <TableColumnMain>Price</TableColumnMain>
                    <TableColumnMain><ButtonUnseen onClick={()=> handleChangeSort("offer")}>Offer Price</ButtonUnseen></TableColumnMain>
                    <TableColumnMain><ButtonUnseen onClick={()=> handleChangeSort("status")}>Status</ButtonUnseen></TableColumnMain>
                </TableRow>
                {roomsMostrar.map(room => (
                    <TableRow key={room.id}>
                        <TableColumnFlexMain>
                            <TableImg src={room.fotoLink} alt={`Room ${room.number}`}/>
                            <TableContainIdName>
                                <TableIdNameContainer>
                                    #{room.id}
                                </TableIdNameContainer>
                                <TableIdNameContainer>
                                    {room.number}
                                </TableIdNameContainer>
                            </TableContainIdName>
                        </TableColumnFlexMain>
                        <TableColumnMain>{room.bedType}</TableColumnMain>
                        <TableColumnMain>{room.floor}</TableColumnMain>
                        <TableColumnMain big={big2}>{room.amenities}</TableColumnMain>
                        <TableColumnMain>{room.price}/night</TableColumnMain>
                        <TableColumnMain>{room.offer}/night</TableColumnMain>
                        <TableColumnMain>{room.status ? 'Available' : 'Occupied'}</TableColumnMain>
                    </TableRow>
                ))}         
            </TableRoomData>  
            <ButtonNextBack first={first}onClick={() =>setPage(page-1)} disabled={isDisabledBack}>Back</ButtonNextBack>
            {Array.from({ length: maxPages }, (_, index) => (
                    <ButtonPage key={index+1} active={index === page}  onClick={() => handlePageClick(index)}>{index + 1}</ButtonPage>
                ))}
            <ButtonNextBack onClick={() =>setPage(page+1)} disabled={isDisabledNext}>Next</ButtonNextBack>         
        </>
    )
}

export default Room