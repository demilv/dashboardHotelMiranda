import { FormContainer, PairRadio, RadioBigContainer } from "../../styledComponents/StyledForms";
import React from "react";

const AddRoom = () =>{


    return(
        <FormContainer>
            <form>
                <h4>Room pics</h4>
                <input type="file" />
                <h4>Room Number</h4>
                <input type="text" />
                <h4>Room type</h4>
                <select>
                    <option>Single bed</option>
                    <option>Double bed</option>
                    <option>Double superior</option>
                    <option>Suite</option>
                </select>
                <h4>Room description</h4>
                <input type="text" />
                <h4>Room price</h4>
                <input type="number"/>
                <h4>Is there an offer?</h4>
                <select>
                    <option>Yes</option>
                    <option>No</option>
                </select>
                <h4>Discount</h4>
                <input type="text"/>
                <h4>Cancel policy</h4>
                <input type="text" />
                <h4>Amenities</h4>
                <RadioBigContainer>
                    <PairRadio>
                        <label>AC</label>
                        <input type="radio" value="AC"/>
                    </PairRadio>
                    <PairRadio>
                        <label>Shower</label>
                        <input type="radio" value="Shower"/>
                    </PairRadio>
                    <PairRadio>
                        <label>Double Bed</label>
                        <input type="radio" value="Double Bed"/>
                    </PairRadio>
                    <PairRadio>
                        <label>Towel</label>
                        <input type="radio" value="Towel"/>
                    </PairRadio>
                    <PairRadio>
                        <label>Bathup</label>
                        <input type="radio" value="Bathup"/>
                    </PairRadio>
                    <PairRadio>
                        <label>Coffee Set</label>
                        <input type="radio" value="Coffee Set"/>
                    </PairRadio>
                    <PairRadio>
                        <label>LED TV</label>
                        <input type="radio" value="LED TV"/>
                    </PairRadio>
                    <PairRadio>
                        <label>Wifi</label>
                        <input type="radio" value="Wifi"/>
                    </PairRadio>
                </RadioBigContainer>
                <input type="submit" value="New room"/>
            </form>
        </FormContainer>
    )
}

export default AddRoom