import React from "react";
import { PopupContainer, PopupContent } from "../../styledComponents/StyledTabla";
import { CloseButtonn } from "../../styledComponents/StyledButton"

const Popup = ({ specialRequest, onClose }) => (
  <PopupContainer onClick={onClose}>
    <PopupContent onClick={(e) => e.stopPropagation()}>
      <CloseButtonn onClick={onClose}>×</CloseButtonn>
      <p>{specialRequest}</p>
    </PopupContent>
  </PopupContainer>
);

export default Popup;
