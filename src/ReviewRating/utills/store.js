import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import companySlice from "../features/company/companySlice";
import authSlice from "../features/auth/authSlice";
import reviewSlice from "../features/review/reviewSlice";

const store = configureStore(
    {
        reducer : {
            company : companySlice,
            user : authSlice,
            review : reviewSlice,
        },

    },
    applyMiddleware(thunk)
);

export default store;