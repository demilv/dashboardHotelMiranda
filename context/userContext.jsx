import { createContext, useReducer } from "react";
import React from "react";

const userReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERDATA":
            return { ...state, 
                user:{
                        email: action.payload.email,
                        pass: action.payload.pass,
                        autenticado: true
                    }};
        case "LOGOUT":
            return {...state, user:{autenticado:null}};
        default:
            return state;
    }
}

export const UserContext = createContext(null)

export const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, {user:{
        email: null,
        pass: null,
        autenticado: false
    }});

    return (
        <UserContext.Provider value={{state , dispatch}}>
            {children}
        </UserContext.Provider>
    )
}