import React, { useState, useEffect } from "react";
import roomData from "../../data/roomData.json"
import { ButtonNewRoom, ButtonSort, ButtonNextBack, ButtonPage} from "./StyledButtonRoom";
import { TableColumnMain, TableIdNameContainer, TableImg, TableRoomData, TableRow } from "./StyledTablaRoom";

const Room = () => {
    const [active, setActive] = useState("All")
    const [sorting, setSorting] = useState("id")
    const [page, setPage] = useState(0)
    const [sortedRooms, setSortedRooms] = useState([])
    const [roomsMostrar, setRoomsMostrar] = useState([])
    const [isDisabledBack, setIsDisabledBack] = useState()
    const [isDisabledNext, setIsDisabledNext] = useState()

    const handlePageClick = (index) =>{
        setPage(index)
    }

    const maxPages = Math.floor(roomData.length / 10)

    useEffect(() =>{
        setSortedRooms(roomData.sort((a, b) => {
            if (a[sorting] < b[sorting]) return -1;
            if (a[sorting] > b[sorting]) return 1;
            return 0;
        }));
        setPage(0)
    }, [sorting]);

      useEffect(() => {
        const registros = page*10;
        setRoomsMostrar (sortedRooms.slice(registros, registros+10))
      }, [page, sortedRooms]);

      useEffect(() =>{
        if (page === 0){
            setIsDisabledBack(true)
            setIsDisabledNext(false)
        }else if(page === maxPages){
            setIsDisabledBack(false)
            setIsDisabledNext(true)
        }else{
            setIsDisabledBack(false)
            setIsDisabledNext(false)
        }
      }, [page])



    return (
        <>
            <ButtonSort active={active === "All"} onClick={() => setActive("All")}>All</ButtonSort>
            <ButtonSort active={active === "Available"} onClick={() => setActive("Available")}>Available</ButtonSort>
            <ButtonSort active={active === "Not available"} onClick={() => setActive("Not available")}>Not available</ButtonSort>
            <ButtonNewRoom>+ New Room</ButtonNewRoom>
            <TableRoomData>
                <TableRow>
                    <TableColumnMain>Room Name</TableColumnMain>
                    <TableColumnMain>Room Type</TableColumnMain>
                    <TableColumnMain>Room Floor</TableColumnMain>
                    <TableColumnMain>Amenities</TableColumnMain>
                    <TableColumnMain>Price</TableColumnMain>
                    <TableColumnMain>Offer Price</TableColumnMain>
                    <TableColumnMain>Status</TableColumnMain>
                </TableRow>
                {roomsMostrar.map(room => (
                    <TableRow key={room.id}>
                        <TableColumnMain>
                            <TableImg src={room.fotoLink}/>
                            <TableIdNameContainer>
                                {room.id}{room.number}
                            </TableIdNameContainer>
                        </TableColumnMain>
                        <TableColumnMain>{room.bedType}</TableColumnMain>
                        <TableColumnMain>{room.floor}</TableColumnMain>
                        <TableColumnMain>{room.amenities}</TableColumnMain>
                        <TableColumnMain>{room.price}/night</TableColumnMain>
                        <TableColumnMain>{room.offer}/night</TableColumnMain>
                        <TableColumnMain>{room.status ? 'Available' : 'Occupied'}</TableColumnMain>
                    </TableRow>
                ))}         
            </TableRoomData>  
            <ButtonNextBack onClick={() =>setPage(page-1)} disabled={isDisabledBack}>Back</ButtonNextBack>
            {Array.from({ length: maxPages + 1 }, (_, index) => (
                    <ButtonPage key={index} onClick={() => handlePageClick(index)}>{index + 1}</ButtonPage>
                ))}
            <ButtonNextBack onClick={() =>setPage(page+1)} disabled={isDisabledNext}>Next</ButtonNextBack>         
        </>
    )
}

export default Room