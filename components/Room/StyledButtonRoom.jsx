import styled from "styled-components";

export const ButtonSort = styled.button`
  margin-top: 3em;
  padding: 0 2em 0 2em;
  width:10em;
  border: none;
  border-bottom: 1px solid ${props => props.active ? 'green' : 'grey'};
  color: ${props => props.active ? 'green' : 'grey'};
  background-color:transparent;
`;

export const ButtonNewRoom = styled.button`
    border-radius:0.4em;
    background-color: rgb(6, 74, 4);  
    color: white;
    margin-top:4em;
    max-height: 2em;
    padding: 0.5em 3em 1em 3em;
    margin-right:5%;
`

export const ButtonNextBack = styled.button`
    margin-left: ${props => props.first ? '60%' : ''};
    border-radius:0.4em;
    color: rgb(6, 74, 4);
    border: 1px solid  rgb(6, 74, 4);
    width:5em;
    padding: 1em;
    margin-right:0.5em
`

export const ButtonPage = styled.button`
    border-radius:0.4em;
    min-width: 4.5em;
    margin-bottom:1em;
    margin-right:0.5em;
    padding: 1em 2em;
    border:none;
    font-color: ${props => props.active ? 'white' : 'black'};
    background-color: ${props => props.active ? 'green' : 'transparent'};
    text-align:center;
`

export const ButtonUnseen = styled.button`
    border:none;
    background-color:transparent;
    color:black;
    font-weight:700
`

/*export const SelectTime = styled.select`
    background-color:white;
    border-radius:0.4em;
    border-color: rgb(6, 74, 4);
    margin-left:2em;
    color: rgb(6, 74, 4);
    padding: 1em 5em 1em 2em;

`*/