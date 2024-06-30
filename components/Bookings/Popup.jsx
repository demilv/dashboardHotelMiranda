import React from "react";
import { PopupContainer, PopupContent } from "../../styledComponents/StyledTabla";
import { CloseButton } from "../../styledComponents/StyledButton"

const Popup = ({ specialRequest, onClose }) => (
  <PopupContainer onClick={onClose}>
    <PopupContent onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>×</CloseButton>
      <p>{specialRequest}</p>
    </PopupContent>
  </PopupContainer>
);

export default Popup;
