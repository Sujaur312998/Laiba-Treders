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

export const navSlice = createSlice({
    name: 'TOGGLE_SIDE_NAVBAR',
    initialState,
    reducers: {
        togleSideNavbar: (state,action:PayloadAction<boolean>) => {
            state.toggle_side_navbar=action.payload
        },
        toggleTopNavBar: (state,action:PayloadAction<boolean>) => {
            state.toogle_top_navbar=action.payload
            
        }
    },
})

// Action creators are generated for each case reducer function
export const { togleSideNavbar, toggleTopNavBar } = navSlice.actions

export default navSlice.reducer