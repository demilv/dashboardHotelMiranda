import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil, FaRegEye } from "react-icons/fa6";
import { ButtonNewRoom, ButtonSort, ButtonNextBack, ButtonPage, ButtonUnseen } from "../../styledComponents/StyledButton";
import { TableColumnFlexMain, TableColumnMain, TableContainIdName, TableFirstRow, TableIdNameContainer, TableImg, TableRoomData, TableRow } from "../../styledComponents/StyledTabla";
import { roomDataSelect, roomErrorSelect, roomStatusSelect, deleteRoom } from "../../features/roomOperations/roomSlice";
import { roomThunk } from "../../features/roomOperations/roomThunk";
import { AppDispatch } from "../../app/store";
import { Room as RoomClass } from "../../features/Types/typeInterfaces";

const Room = () : React.JSX.Element => {
    type RoomKeys = keyof RoomClass
    const [active, setActive] = useState<string>("All");
    const [sorting, setSorting] = useState<RoomKeys>("id");
    const [page, setPage] = useState<number>(0);
    const [sortedRooms, setSortedRooms] = useState<RoomClass[]>([]);
    const [roomsMostrar, setRoomsMostrar] = useState<RoomClass[]>([]);
    const [isDisabledBack, setIsDisabledBack] = useState<boolean>();
    const [isDisabledNext, setIsDisabledNext] = useState<boolean>();
    const [maxPages, setMaxPages] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const roomDataSinMapear = useSelector(roomDataSelect);
    const roomStatus = useSelector(roomStatusSelect);
    const roomError = useSelector(roomErrorSelect);
    const [loading, setLoading] = useState<boolean>(true);
    const [roomData, setRoomData] = useState<RoomClass[]>([]);

    const big1: "big1" | "" = "big1"
    const big2: "big2" | "" = "big2"
    const first: "first" | "" = "first"
    const navigate = useNavigate();

    const editRoom = (roomId:number) => {
        navigate(`/editRoom/${roomId}`);
    };

    const checkRoom = (roomId: number) => {
        navigate(`/checkRoom/${roomId}`);
    };
    
    const addRoom = () => {
        navigate("/addRoom");
    };

    const handlePageClick = (index: number) => {
        setPage(index);
    };

    const handleChangeSort = (type: RoomKeys) => {
        setSorting(type);
    };
    
    useEffect(() => {
        if (roomsMostrar.length === 0){
            if (roomStatus === "idle") {
                dispatch(roomThunk());
            } else if (roomStatus === "pending") {
                setLoading(true);
            } else if (roomStatus === "fulfilled") {
                setLoading(false);
                let RoomDataMapeado: RoomClass[] = [];
                roomDataSinMapear.forEach((room) => 
                {
                    const añadirReview: RoomClass = 
                    {
                        fotoLink: room.fotoLink, id: room.id, number: room.number, floor: room.floor, bedType: room.bedType, amenities: room.amenities, price: room.price, status: room.status, offer: room.offer, cancelPolicy: room.cancelPolicy 
                    }
                    RoomDataMapeado.push(añadirReview)
                });
                setRoomData(RoomDataMapeado);
                setMaxPages(Math.ceil(RoomDataMapeado.length / 10));
            } else if (roomStatus === "rejected") {
                setLoading(false);
                console.log(roomError);
            }
        }
    }, [roomStatus, roomDataSinMapear, roomError]);

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
    }, [sorting, active, roomData]);

    useEffect(() => {
        const registros = page * 10;
        setRoomsMostrar(sortedRooms.slice(registros, registros + 10));
    }, [page, sortedRooms]);

    useEffect(() => {
        if (page === 0) {
            setIsDisabledBack(true);
            setIsDisabledNext(false);
            if (page + 1 === maxPages) {
                setIsDisabledNext(true);
            }
        } else if (page + 1 === maxPages) {
            setIsDisabledBack(false);
            setIsDisabledNext(true);
        } else {
            setIsDisabledBack(false);
            setIsDisabledNext(false);
        }
    }, [page, maxPages]);

    const handleDeleteRoom = (roomId: number) => {
        dispatch(deleteRoom(roomId));
        const updatedRoomData = roomData.filter(room => room.id !== roomId);
        setRoomData(updatedRoomData);
    };

    return (
        <>
            {loading ? (
                <p>wait a moment please</p>
            ) : (
                <>
                    <TableFirstRow>
                        <TableRow first={first}>
                            <ButtonSort active={active === "All"} onClick={() => setActive("All")}>All</ButtonSort>
                            <ButtonSort active={active === "Available"} onClick={() => setActive("Available")}>Available</ButtonSort>
                            <ButtonSort active={active === "Not available"} onClick={() => setActive("Not available")}>Not available</ButtonSort>
                        </TableRow>
                        <ButtonNewRoom onClick={addRoom}>+ New Room</ButtonNewRoom>
                    </TableFirstRow>
                    <TableRoomData>
                        <TableRow>
                            <TableColumnMain big={big1}><ButtonUnseen onClick={() => handleChangeSort("id")}>Room Name</ButtonUnseen></TableColumnMain>
                            <TableColumnMain>Room Type</TableColumnMain>
                            <TableColumnMain>Room Floor</TableColumnMain>
                            <TableColumnMain big={big2}>Amenities</TableColumnMain>
                            <TableColumnMain>Price</TableColumnMain>
                            <TableColumnMain><ButtonUnseen onClick={() => handleChangeSort("offer")}>Offer Price</ButtonUnseen></TableColumnMain>
                            <TableColumnMain><ButtonUnseen onClick={() => handleChangeSort("status")}>Status</ButtonUnseen></TableColumnMain>
                        </TableRow>
                        {roomsMostrar.map(room => (
                            <TableRow key={room.id}>
                                <TableColumnFlexMain>
                                    <TableImg src={room.fotoLink[0]} alt={`Room ${room.number}`} />
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
                                <TableColumnMain><FaTrashAlt onClick={() => handleDeleteRoom(room.id)}/><FaPencil  onClick={() => editRoom(room.id)}/><FaRegEye onClick={() => checkRoom(room.id)}></FaRegEye></TableColumnMain>
                            </TableRow>
                        ))}
                    </TableRoomData>
                    <ButtonNextBack first={first} onClick={() => setPage(page - 1)} disabled={isDisabledBack}>Back</ButtonNextBack>
                    {Array.from({ length: maxPages }, (_, index) => (
                        <ButtonPage key={index + 1} active={index === page} onClick={() => handlePageClick(index)}>{index + 1}</ButtonPage>
                    ))}
                    <ButtonNextBack onClick={() => setPage(page + 1)} disabled={isDisabledNext}>Next</ButtonNextBack>
                </>
            )}
        </>
    );
};

export default Room;
