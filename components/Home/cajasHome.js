import styled from "styled-components";

export const CajaMainContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const CajaImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    background-color: ${({ isSelected }) => (isSelected ? 'rgb(200, 50, 50)' : 'rgb(255, 99, 99)')};
    margin-right: 1em;
    transition: background-color 0.3s;
`;

export const CajaStyled = styled.div`
    border-radius: 0.4em;
    border: none;
    padding: 1.2em;
    width: 13em;
    display: flex;
    flex-direction: row;
    border: 1px solid;
    margin-right: 2em;
    background-color: white;
`;

export const CajaDiv = styled.div`
    display: flex;
    flex-direction: column;
`;
