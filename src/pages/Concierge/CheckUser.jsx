import { CheckContainer, MainCheckContainer, CheckImg } from "../../styledComponents/StyledCheckPages";
import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { conciergeDataSelect } from "../../features/conciergeOperations/conciergeSlice";

const CheckUser = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const users = useSelector(conciergeDataSelect);

    const userToCheck = users.find(user => user.id === parseInt(userId, 10));

    const userData = {
        id: userToCheck?.id,
        photo: userToCheck?.photo || "",
        name: userToCheck?.name || "",
        job: userToCheck?.job || "",
        email: userToCheck?.email || "",
        phone: userToCheck?.phone || 0,
        startDate: userToCheck?.startDate || "No",
        responsibilities: userToCheck?.responsibilities || "",
        status: userToCheck?.status || "",
    };

    console.log(userToCheck)

    return (
        <>
            <MainCheckContainer>
                <CheckContainer>    
                    <h2>Username</h2>
                    <h4>{userData.name}</h4>
                    <h2>User job</h2>
                    <h4>{userData.job}</h4>
                    <h2>User email</h2>
                    <h4>{userData.email}</h4>
                    <h2>User phone</h2>
                    <h4>{userData.phone}</h4>
                    <h2>User starting date</h2>
                    <h4>{userData.startDate}</h4>
                    <h2>User ersponsibilities</h2>
                    <h4>{userData.responsibilities}</h4>
                    <h2>User current status</h2>
                    <h4>{userData.status}</h4>
                </CheckContainer>
                <CheckContainer>                    
                    <CheckImg src={userData.photo} />                          
                </CheckContainer>
            </MainCheckContainer>
        </>
    );
};

export default CheckUser;