import { createSlice } from "@reduxjs/toolkit";
import { addHome, getHome, updateHome } from "./homeAction";

const initialState = {
  home: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: ''
}

export const userSlice = createSlice({
  name: 'home',
  initialState,
  extraReducers: {
    [getHome.pending]: (state) => {
      state.isLoading = true;
    },
    [getHome.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.home = payload.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },
    [getHome.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload
    },
    [updateHome.pending]: (state) => {
      state.isLoading = true;
    },

    [updateHome.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.home = payload.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },
    [updateHome.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload
    },
    [addHome.pending]: (state) => {
      alert("updated data")
      state.isLoading = true;
    },

    [addHome.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.home = payload.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },
    [addHome.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload
    },
  }
})

export default userSlice.reducer;