import React from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";

const HomeReview = ({ review, customerName, date }) => {
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

    return (
        <div className="reviewContainer">                            
            <p className="reviewContainerP">{review}</p>
            <div className="reviewContainerInside">
                <div className="reviewContainerInside2">
                    <h3 className="reviewContainerInside2Nombre">{customerName}</h3>
                    <h6 className="reviewContainerInside2Time">{timeSince(date)} ago</h6>
                </div>
                <div className="reviewContainerInside3">
                    <IoIosCheckmarkCircleOutline className="circleLeft" />
                    <MdOutlineCancel />
                </div>
            </div>
        </div>
    );
};

export default HomeReview;
