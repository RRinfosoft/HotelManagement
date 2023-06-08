
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { collection, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
 
export const getCer= createAsyncThunk('user/getCer', async (page, { rejectWithValue }) => {
  try {
  return await getDoc(collection(db,"certification"))
  } catch (error) {
    return rejectWithValue(error.message);
  }
})