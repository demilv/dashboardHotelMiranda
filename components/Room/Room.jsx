import React, { useState, useEffect } from "react";
import roomData from "../../data/roomData.json"
import { ButtonNewRoom, ButtonSort, SelectTime } from "./StyledButtonRoom";
import { TableColumnMain, TableRoomData, TableRow } from "./StyledTablaRoom";

const Room = () => {
    const [active, setActive] = useState("All")
    const [sorting, setSorting] = useState("id")
    const [page, setPage] = useState(0)

    useEffect(() =>{
        const sortedRooms = roomData.sort(sorting)
    }, [sorting])

    useEffect(() => {
        const registros = page*10;
        const roomsMostrar = sortedRooms.slice(registros, registros+10)
      }, []);

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
                
            </TableRoomData>
        </>
    )
}

export default Room