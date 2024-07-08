import styled from "styled-components";

export const MainNavbar = styled.div`    
padding-left: 11%;
width: 100%;
`

export const NavbarContainer = styled.div`    
    width:100%;
    height: 4em;
    display: flex;
    flex-direction: row;
    position: relative;
`
/*
.navbar__burger {
    border: none;
    background-color: transparent;
    margin-left: 2em;
    cursor: pointer;
}

.navbar__main {
    display: flex;
    flex-direction: row;
    background-color: rgb(247, 247, 247);    
    width: 95%;
    transition: margin-left 0.3s ease;
}

.navbar__h1 {
    margin: 0.7em 28em 0 1em;
}

.navbar__icon {
    margin: 1.5em 0 0 2.5em;
}

.iconFirst {
    margin-left: 20em;
}

.navbarFoto {
    width: 3em;
    height: 3em;
    margin: 0.5em 0 0 2.5em;
}

.navbar__aside {
    display: flex;
    position: absolute;
    left: -13.9em;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    flex-direction: column;
    text-align: center;
    border: none;
    width:14em;
    height: 100%;
    background-color: white;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    z-index: -1;
}

.navbar__aside.visible {
    transform: translateX(0);
    display:flex;
    z-index:0;
}

.navbar__aside__logo {
    width: 80%;
    margin: 0 0 1em 1em;
}

.navbar__aside__img {
    width: 3.5em;
    margin-top: 9em;
    position: absolute;
    top: 21em;
    left: calc(50% - 1.75em);
}

.navbar__aside__h2 {
    margin-top: 13em;
    font-size: 0.8em;
}

.navbar__aside__myData {
    padding-top: 1.5em;
    width: 9em;
    margin-top: 10em;
    margin-left: auto;
    margin-right: auto;
    background-color: rgb(241, 241, 241);
    box-shadow: 0 0.85em 1.5em 0 #7777775c;
    margin-bottom: 3em;
}

.myData__mail {
    font-size: 0.5em;
    margin: 0.8em 0 1.5em;
}

.myData__contact {
    border-radius: 0.4em;
    border: none;
    background-color: rgb(177, 242, 177);
    color: green;
    width: 7em;
    height: 2em;
    margin-bottom: 1.5em;
}

.navbar__aside__h6 {
    margin-bottom: 3em;
}

.noShow{
    background-color: transparent;
    border:none;
    padding: 0.25em 1em;
}
*/
export const OutletContainer = styled.div`    
    width:95%;
    padding: 2em 2em 0 2em;
    z-index:1;    
    min-height:55.5em;
    background-color: rgb(192, 192, 192);    
`
