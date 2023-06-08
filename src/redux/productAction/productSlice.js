import { createSlice } from "@reduxjs/toolkit";
import { addProduct, getProducts, updateProduct } from "./productAction";
import { deleteProduct } from "./productAction";
const initialState = {
  products: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: ''
}

export const userSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = payload.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },
    [getProducts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload
    },

    // Detele

    [deleteProduct.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = payload.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload
    },


// UPADTE
    [updateProduct.pending]: (state) => {
      state.isLoading = true;
    },

    [updateProduct.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = payload.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    },
    [updateProduct.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload
    },

// ADD

[addProduct.pending]: (state) => {
  alert("updated data")
  state.isLoading = true;
},

[addProduct.fulfilled]: (state, { payload }) => {
  state.isLoading = false;
  state.isSuccess = true;
  state.products = payload.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
},
[addProduct.rejected]: (state, { payload }) => {
  state.isLoading = false;
  state.isSuccess = false;
  state.errorMessage = payload
},


    
  }
})

export default userSlice.reducer;