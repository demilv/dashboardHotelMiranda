import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { HomeReviewMainContainer, HomeReviewMainContainerInside, HomeReviewMainContainerInside2, HomeReviewMainContainerInside3, HomeReviewCircle, HomeReviewGreySquare } from "./StyledCajasHomeReview";
import styled from 'styled-components';

const RecentReviews = ({ review, customerName, date }) => {
    const timeSince = (date) => {
        const now = new Date();
        const reviewDate = new Date(date);
        const seconds = Math.floor((now - reviewDate) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    };

    const GreenCheckIcon = styled(IoIosCheckmarkCircleOutline)`
        color: green;
    `;

    const RedCancelIcon = styled(MdOutlineCancel)`
        color:red;
    `

    return (
        <HomeReviewMainContainer>                    
            <p className="reviewContainerP">{review}</p>
            <HomeReviewMainContainerInside>
                <HomeReviewGreySquare></HomeReviewGreySquare>
                <HomeReviewMainContainerInside2>
                    <h3 className="reviewContainerInside2Nombre">{customerName}</h3>
                    <h6 className="reviewContainerInside2Time">{timeSince(date)} ago</h6>
                </HomeReviewMainContainerInside2>
                <HomeReviewMainContainerInside3>
                    <HomeReviewCircle><GreenCheckIcon/></HomeReviewCircle>
                    <RedCancelIcon />
                </HomeReviewMainContainerInside3>
            </HomeReviewMainContainerInside>
        </HomeReviewMainContainer>
    );
};

export default RecentReviews;
