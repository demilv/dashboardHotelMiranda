import React, { useState, useEffect } from "react";
import conciergeData from '../../data/conciergeData.json';
import { ButtonNewRoom, ButtonSort, ButtonNextBack, ButtonPage, ButtonUnseen} from "../../styledComponents/StyledButton";
import { TableColumnFlexMain, TableColumnMain, TableContainIdName, TableFirstRow, TableIdNameContainer, TableImg, TableRoomData, TableRow } from "../../styledComponents/StyledTabla";
import { TextColorfulNoBackground } from "../../styledComponents/TextStyled";
import { MdOutlinePhone } from "react-icons/md";


const Reviews= () => {

    const [active, setActive] = useState("All Contacts")
    const [sorting, setSorting] = useState("startDate")
    const [page, setPage] = useState(0)
    const [sortedUsers, setSortedUsers] = useState([])
    const [usersMostrar, setUsersMostrar] = useState([])
    const [isDisabledBack, setIsDisabledBack] = useState()
    const [isDisabledNext, setIsDisabledNext] = useState()
    const [maxPages, setMaxPages] = useState(Math.ceil(conciergeData.length / 10))

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
        let filteredUsers = conciergeData;
        if (active === "Active") {
            filteredUsers = filteredUsers.filter(review => review.status);
        }else if (active === "Inactive"){
            filteredUsers = filteredUsers.filter(review => !review.status);
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
    }, [sorting, active]);

      useEffect(() => {        
        const registros = page*10;
        setUsersMostrar (sortedUsers.slice(registros, registros+10))
      }, [page, sortedUsers, sorting, active]);

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
      }, [page, sortedUsers])

       const colorText = (status) =>{
        if (status === true){        
            return <TextColorfulNoBackground color={"green"}>Active</TextColorfulNoBackground>
        }else{
            return <TextColorfulNoBackground color={"red"}>Inactive</TextColorfulNoBackground>
        }
       }

    return (
        <>
            <TableFirstRow>
                <TableRow first={first}>
                    <ButtonSort active={active === "All Employee"} onClick={() => setActive("All Employee")}>All Employee</ButtonSort>
                    <ButtonSort active={active === "Active"} onClick={() => setActive("Active")}>Active</ButtonSort>
                    <ButtonSort active={active === "Inactive"} onClick={() => setActive("Inactive")}>Inactive</ButtonSort>
                </TableRow>
            </TableFirstRow>
            <TableRoomData>
                <TableRow>
                    <TableColumnMain big={big1}><ButtonUnseen onClick={()=> handleChangeSort("id")}>Name</ButtonUnseen></TableColumnMain>
                    <TableColumnMain big={big1}>Job Desk</TableColumnMain>
                    <TableColumnMain>Schedule</TableColumnMain>
                    <TableColumnMain>Contact</TableColumnMain>
                    <TableColumnMain>Status</TableColumnMain>
                </TableRow>
                {usersMostrar.map(user => (
                    <TableRow key={user.id}>                        
                        <TableColumnFlexMain>
                            <TableImg src={user.photo} alt={`User ${user.id}`}/>
                            <TableContainIdName>
                                <TableIdNameContainer>
                                    #{user.name}
                                </TableIdNameContainer>
                                <TableIdNameContainer>
                                    {user.id}
                                </TableIdNameContainer>
                                <TableIdNameContainer>
                                    Joined in {user.startDate}
                                </TableIdNameContainer>
                            </TableContainIdName>
                        </TableColumnFlexMain>
                        <TableColumnMain>{user.description}</TableColumnMain>
                        <TableColumnMain> Schedule</TableColumnMain>
                        <TableColumnMain><MdOutlinePhone />{user.phone}</TableColumnMain>
                        <TableColumnMain>{colorText(user.status)}</TableColumnMain>
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