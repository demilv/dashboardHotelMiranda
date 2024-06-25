import React, { useState, useContext, createContext } from "react";
import styled from "styled-components";

const ActiveButtonContext = createContext();

const handleColorType = (color, active) => {
    if (active) {
        return 'rgb(250, 83, 83)';
    }
    switch (color) {
        case "red":
            return 'rgb(250, 83, 83)';
        case "white":
            return '#ffffff';
        default:
            return '#222222';
    }
};

const ButtonStyled = styled.button`
    height: 2em;
    border: none;
    background-color: transparent;
    padding: 0 0.5em;
    border-left: 2px solid ${({ color, active }) => handleColorType(color, active)};
    color: ${({ active }) => (active ? 'rgb(250, 83, 83)' : 'green')};
    margin-bottom:2em;
`;

const Button = ({ initialColor = "white", children, index }) => {
    const { activeIndex, setActiveIndex } = useContext(ActiveButtonContext);
    const isActive = activeIndex === index;

    const handleClick = () => {
        setActiveIndex(index);
    };

    return (
        <ButtonStyled color={initialColor} active={isActive} onClick={handleClick}>
            {children}
        </ButtonStyled>
    );
};

export const ButtonProvider = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <ActiveButtonContext.Provider value={{ activeIndex, setActiveIndex }}>
            {children}
        </ActiveButtonContext.Provider>
    );
};

export default Button;
