import { createSlice } from "@reduxjs/toolkit";
import { getCer } from "./certificationAction";
// import { getProducts } from "./productAction";
 
const initialState = {
    certification: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: ''
}
 
export const userSlice = createSlice({
  name: 'certification',
  initialState,
  extraReducers: {
    [getCer.pending]: (state) => {
      state.isLoading = true;
    },
    [getCer.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.certification = payload.docs.map((doc)=>({id:doc.id, ...doc.data()}))
    },
    [getCer.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload
    }
  }
})
 
export default userSlice.reducer;