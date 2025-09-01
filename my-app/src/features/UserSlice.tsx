    // {
    //   "id": 2,
    //   "email": "noa@example.com",
    //   "created_at": "2025-06-29T08:22:13Z"
    // },
import { createSlice } from "@reduxjs/toolkit";
const initValue = {
    user: "null",
    email: "",
    idUser:2
}

const UserSlice = createSlice(
    {
        name: "userState",
        initialState: initValue,
        reducers: {
            changeUser: (state, actions) => {
                state.user = actions.payload
            },
            changeEmail: (state, action) => {
                state.email = action.payload;
            },
            changeIdUser:(state,actions)=>{
                state.idUser=actions.payload
            }
        }
    }
)

export const { changeUser,changeEmail,changeIdUser} = UserSlice.actions;
export default UserSlice.reducer
