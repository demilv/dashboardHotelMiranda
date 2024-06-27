import styled from "styled-components";

export const ButtonSort = styled.button`
  margin-top: 3em;
  padding: 0 2em 0 2em;
  width:10em;
  border: none;
  border-bottom: 1px solid ${props => props.active ? 'green' : 'grey'};
  font-color: ${props => props.active ? 'green' : 'grey'};
  background-color:transparent;
`;

export const ButtonNewRoom = styled.button`
    border-radius:0.4em;
    background-color: rgb(6, 74, 4);  
    color: white;
    padding: 1em 2em;
    width:17em;
    margin-left:20%;
`

export const SelectTime = styled.select`
    background-color:white;
    border-radius:0.4em;
    border-color: rgb(6, 74, 4);
    margin-left:2em;
    color: rgb(6, 74, 4);
    padding: 1em 5em 1em 2em;

`