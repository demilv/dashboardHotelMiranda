import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
import { ButtonUnseen} from "./styledComponents/StyledButton";

const state = {
    green: "green",
    red: "red"
}

test("With green button", ()=>{
    render(<ButtonUnseen color={state.green}>check</ButtonUnseen>)
    expect(screen.getByRole("button", {name: /check/i})).toHaveStyle({
        color:"green"
    })
})

test("With red button", ()=>{
    render(<ButtonUnseen color={state.red}>check</ButtonUnseen>)
    expect(screen.getByRole("button", {name: /check/i})).toHaveStyle({
        color:"red"
    })
})