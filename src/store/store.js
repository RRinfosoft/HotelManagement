import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../redux/productAction/productSlice";
import certificationSlice from "../redux/certification/certificationSlice";
import homeSlice from "../redux/home/homeSlice";

const store = configureStore({
    reducer:{
    products: productSlice,
    certification: certificationSlice,
    home: homeSlice
    },
});

export default store;