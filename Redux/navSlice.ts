import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    toggle_side_navbar: Boolean,
    toogle_top_navbar: Boolean
}

const initialState: CounterState = {
    toggle_side_navbar: true,
    toogle_top_navbar: false
}

export const counterSlice = createSlice({
    name: 'TOGGLE_SIDE_NAVBAR',
    initialState,
    reducers: {
        togleSideNavbar: (state,action) => {
            state.toggle_side_navbar=action.payload
        },
        toggleTopNavBar: (state,action) => {
            state.toogle_top_navbar=action.payload
            
        }
    },
})

// Action creators are generated for each case reducer function
export const { togleSideNavbar, toggleTopNavBar } = counterSlice.actions

export default counterSlice.reducer