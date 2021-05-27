/* eslint-disable linebreak-style */
/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit'

const notes = createSlice({
    name: 'notes',
    initialState: {
        items: []        
    },
    reducers: {
        setNotes: (store, action) => {
            store.items = action.payload
        }
        
    }
})

export default notes