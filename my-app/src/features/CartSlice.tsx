import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import { string } from "yup";
type Advertisting = {
  id: number,
  title: string,
  description: string,
  image_url: string,
  creator_user_id: number,
  created_at: Date
};

type CartState = {
  cart: Advertisting[];
};
const initValue:CartState = {
    cart: []
}

const CartSlice = createSlice(
    {
        name: "CartState",
        initialState: initValue,
        reducers: {
            addtocart:(state,actions: PayloadAction<Advertisting>)=>
            {
                state.cart.push(actions.payload)
            },
        }
    }
)



export const {addtocart}=CartSlice.actions;
export default CartSlice.reducer
