import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlinePhone } from "react-icons/md";
import { ButtonNewRoom, ButtonSort, ButtonNextBack, ButtonPage, ButtonUnseen } from "../../styledComponents/StyledButton";
import { TableColumnFlexMain, TableColumnMain, TableContainIdName, TableFirstRow, TableIdNameContainer, TableImg, TableRoomData, TableRow } from "../../styledComponents/StyledTabla";
import { TextColorfulNoBackground } from "../../styledComponents/TextStyled";
import { conciergeDataSelect, conciergeStatusSelect, conciergeErrorSelect, deleteUser } from "../../features/conciergeOperations/conciergeSlice";
import { conciergeUsersThunk } from "../../features/conciergeOperations/conciergeUsersThunk";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil, FaRegEye } from "react-icons/fa6";

const Concierge = () => {
    const [active, setActive] = useState("All Employee");
    const [sorting, setSorting] = useState("startDate");
    const [page, setPage] = useState(0);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [usersMostrar, setUsersMostrar] = useState([]);
    const [isDisabledBack, setIsDisabledBack] = useState();
    const [isDisabledNext, setIsDisabledNext] = useState();
    const [maxPages, setMaxPages] = useState();
    const dispatch = useDispatch();
    const conciergeDataSinMapear = useSelector(conciergeDataSelect);
    const conciergeStatus = useSelector(conciergeStatusSelect);
    const conciergeError = useSelector(conciergeErrorSelect);
    const [loading, setLoading] = useState(true);
    const [conciergeData, setConciergeData] = useState([]);

    const big1 = "big1";
    const big2 = "big2";
    const first = "first";
    const navigate = useNavigate();

    const editUser = (userId) => {
        navigate(`/editUser/${userId}`);
    };
    
    const addUser = () => {
        navigate("/addUser");
    };

    const checkUser = (userId) => {
        navigate(`/checkUser/${userId}`)
    }

    const handlePageClick = (index) => {
        setPage(index);
    };

    const handleChangeSort = (type) => {
        setSorting(type);
    };
    
    useEffect(() => {
        if (usersMostrar.length === 0) {
            if (conciergeStatus === "idle") {
                dispatch(conciergeUsersThunk());
            } else if (conciergeStatus === "pending") {
                setLoading(true);
            } else if (conciergeStatus === "fulfilled") {
                setLoading(false);
                let conciergeDataMapeado = [];
                conciergeDataSinMapear.forEach((user) => {
                    conciergeDataMapeado.push({ photo: user.photo, id: user.id, name: user.name, job: user.job, startDate: user.startDate, phone: user.phone, status: user.status });
                });
                setConciergeData(conciergeDataMapeado);
                setMaxPages(Math.ceil(conciergeDataMapeado.length / 10));
            } else if (conciergeStatus === "rejected") {
                setLoading(false);
                console.log(conciergeError);
            }
        }
    }, [conciergeStatus, conciergeDataSinMapear, conciergeError]);

    useEffect(() => {
        let filteredUsers = conciergeData;

        if (active === "Active") {
            filteredUsers = filteredUsers.filter(user => user.status);
        } else if (active === "Inactive") {
            filteredUsers = filteredUsers.filter(user => !user.status);
        }

        filteredUsers.sort((a, b) => {
            if (a[sorting] < b[sorting]) return -1;
            if (a[sorting] > b[sorting]) return 1;
            return 0;
        });

        setSortedUsers(filteredUsers);
        setPage(0);

        const newMaxPages = Math.ceil(filteredUsers.length / 10);
        setMaxPages(newMaxPages);
    }, [sorting, active, conciergeData]);

    useEffect(() => {
        const registros = page * 10;
        setUsersMostrar(sortedUsers.slice(registros, registros + 10));
    }, [page, sortedUsers]);

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

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
        const updatedConciergeData = conciergeData.filter(user => user.id !== userId);
        setConciergeData(updatedConciergeData);
    };

    const colorText = (status) => {
        if (status === true){        
            return <TextColorfulNoBackground color={"green"}>Active</TextColorfulNoBackground>
        } else {
            return <TextColorfulNoBackground color={"red"}>Inactive</TextColorfulNoBackground>
        }
    }

    return (
        <>
            {loading ? (
                <p>wait a moment please</p>
            ) : (
                <>
                    <TableFirstRow>
                        <TableRow first={first}>
                            <ButtonSort active={active === "All Employee"} onClick={() => setActive("All Employee")}>All Employee</ButtonSort>
                            <ButtonSort active={active === "Active"} onClick={() => setActive("Active")}>Active</ButtonSort>
                            <ButtonSort active={active === "Inactive"} onClick={() => setActive("Inactive")}>Inactive</ButtonSort>
                        </TableRow>
                        <ButtonNewRoom onClick={addUser}>+ New User</ButtonNewRoom>
                    </TableFirstRow>
                    <TableRoomData>
                        <TableRow>
                            <TableColumnMain big={big1}><ButtonUnseen onClick={() => handleChangeSort("id")}>Name</ButtonUnseen></TableColumnMain>
                            <TableColumnMain big={big1}>Job Desk</TableColumnMain>
                            <TableColumnMain>Schedule</TableColumnMain>
                            <TableColumnMain>Contact</TableColumnMain>
                            <TableColumnMain>Status</TableColumnMain>
                        </TableRow>
                        {usersMostrar.map(user => (
                            <TableRow key={user.id}>
                                <TableColumnFlexMain>
                                    <TableImg active={active} src={user.photo} alt={`User ${user.id}`} />
                                    <TableContainIdName>
                                        <TableIdNameContainer>
                                            {user.name}
                                        </TableIdNameContainer>
                                        <TableIdNameContainer>
                                            #{user.id}
                                        </TableIdNameContainer>
                                        <TableIdNameContainer>
                                            Joined in {user.startDate}
                                        </TableIdNameContainer>
                                    </TableContainIdName>
                                </TableColumnFlexMain>
                                <TableColumnMain>{user.job}</TableColumnMain>
                                <TableColumnMain> Schedule</TableColumnMain>
                                <TableColumnMain><MdOutlinePhone />{user.phone}</TableColumnMain>
                                <TableColumnMain>{colorText(user.status)}</TableColumnMain>
                                <TableColumnMain><FaTrashAlt onClick={() => handleDeleteUser(user.id)}/><FaPencil onClick={() => editUser(user.id)}/><FaRegEye onClick={() => checkUser(user.id)}></FaRegEye></TableColumnMain>
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

export default Concierge;
