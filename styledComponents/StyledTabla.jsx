import styled from "styled-components";

export const TableRoomData = styled.div`
    margin-top: 3em;
    margin-bottom:2.5em;
    border-radius: 0.4em;
    background-color:white;
    width:100%;
    max-height: 35em;
    overflow-y:auto;
`;

export const TableRow = styled.div`
    border:none;    
    border-bottom: ${({ first }) => (first ? '' : '1px solid rgb(219, 219, 219)')};;
    margin-right:2em;
    display:flex;
    flex-direction:row;
    min-height:2.5em;
    padding: 1.25em 1em
`

export const TableColumnMain = styled.div`    
    color:black;
    font-weight:700;
    margin-right:4.8em;
    max-width:15em;
    min-width: ${props => {
        if (props.big === 'big1') return '11.9em';
        if (props.big === 'big2') return '15em';
        return '5em';
    }};

`

export const TableColumnFlexMain = styled.div`    
    display:flex;
    flex-direction:row;
    color:black;
    font-weight:700;
    margin-right:2em;
    min-width:14.9em;
    max-width:14.9em;
`

export const TableImg = styled.img`
    border-radius:0.4em;
    width:4em;    
    height:4em;
    margin-right:1em;
    margin-top:${({active})=> (active ? '0.8em' : '')}
`

export const TableIdNameContainer = styled.div`
    margin-top:0.6em
`

export const TableContainIdName = styled.div`
    display: flex;
    flex-direction:column;
`

export const TableFirstRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: space-between;
`

export const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

export const PopupContent = styled.div`
  background-color: white;
  padding: 2em;
  border-radius: 0.4em;
  max-width: 500px;
  width: 80%;
  position: relative;
`;