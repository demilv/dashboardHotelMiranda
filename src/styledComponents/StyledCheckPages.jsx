import styled from "styled-components";

export const CheckContainer = styled.div`
    display: flex;
    border:1px solid;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 10em;  
    height: 30em;  
    align-items: center;
    width:100%;
    max-width:40em;
    overflow:hidden;
`

export const MainCheckContainer = styled.div`
    display:flex;
    flex-direction:row;    
`

export const CheckImg = styled.img`
    max-width:100%;
    max-height:100%;
    object-fit:cover;
`