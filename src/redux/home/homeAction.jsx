
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getHome = createAsyncThunk('user/getHome', async ({ rejectWithValue }) => {
    try {
        return await getDocs(collection(db, "home"))
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const updateHome = createAsyncThunk('user/updateHome', async ({ data, id }) => {
    try {
        await updateDoc(doc(db, "home",id), {
            ...data
        });
        return await getDocs(collection(db, "home"))
    } catch (error) {
        console.log(error.message)
    }
})

export const addHome = createAsyncThunk('user/addHome', async (data) => {
    try {
        await addDoc(collection(db, "home"), {
            ...data,
        });
        return await getDocs(collection(db, "home"))
    } catch (error) {
        console.log(error.message)
    }
})