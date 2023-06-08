import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getProducts = createAsyncThunk('user/getproducts', async (page, { rejectWithValue }) => {
  try {
    return await getDocs(collection(db, "products"))
  } catch (error) {
    return rejectWithValue(error.message);
  }
})


export const updateProduct = createAsyncThunk('user/updateProduct', async ({ data, id }) => {
  try {
      await updateDoc(doc(db, "products",id), {
          ...data
      });
      return await getDocs(collection(db, "products"))
  } catch (error) {
      console.log(error.message)
  }
})


export const addProduct = createAsyncThunk('user/addProduct', async (data) => {
  try {
      await addDoc(collection(db, "products"), {
          ...data,
      });
      return await getDocs(collection(db, "products"))
  } catch (error) {
      console.log(error.message)
  }
})


export const deleteProduct = createAsyncThunk('user/deleteproduct', async (page, { rejectWithValue }) => {
  try {
    console.log(page)
    await deleteDoc(doc(db, `products/${page}`))
    return await getDocs(collection(db, "products"))
  } catch (error) {
    return rejectWithValue(error.message);
  }
})