import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

let initialState = {
    cmpCreate_msg :"",
    cmpList_msg : "",
    cmpDetail_msg : "",
    company_data : "",
    company_details : "",
    loading : false,
    error : "",
    count : "",
}

//Async Function for Creating Company
export const createCompany = createAsyncThunk(
    'company/create',
    async (body,thunkAPI) =>{
        const res = await axios.post("http://localhost:9000/company/create",body,{
            headers : {
                "Content-Type" : "multipart/form-data",
            },
        });
        return res;
    }
);

//Async Function to get all Companies
export const getCompanies = createAsyncThunk(
    "company/getCompanies",
    async(thunkAPI)=>{
        console.log('get companies Slice');
        const Result = await fetch("http://localhost:9000/company/list",{
            method : 'get',
            headers:{
                'Content-Type' : 'application/json',
            }
        });

        let data = await Result.json();
        console.log("Data:",data);
        if(data.success){
            console.log("success",data);
            return data;
        }else{
            return thunkAPI.rejectWithValues(data);
        }
    }
);

//Async Function to Show Single Company
export const getCompanyDetails = createAsyncThunk(
    "company/getCompanyDetails",
    async(id,thunkAPI) =>{
        const Result = await fetch(`http://localhost:9000/company/details/${id}`,
        {
            method : "get",
            headers : {
                Accept : 'application/json',
                "Context-type" : 'application/json',
            }
        });

        let data = await Result.json();
        if(data.status){
            return data;
        }else{
            return thunkAPI.rejectWithValue(data);
        }
    }
);

const companySlice = createSlice({
    name : "company",
    initialState,
    reducers:{
        clearState : (state) =>{
            state.cmpCreate_msg = "";
            state.error = "";
        },
    },

    extraReducers : {
        //For Create Company
        [createCompany.pending] : (state,{payload}) =>{
            console.log("Pending.....");
            state.loading = true;
            state.error = "";
            state.cmpCreate_msg = ""
        },
        [createCompany.fulfilled] : (state,{payload}) =>{
            state.loading = false;
            console.log("Successful.....",payload);
            state.cmpCreate_msg = payload.data.message;
        },
        [createCompany.rejected] : (state,{payload}) =>{
            console.log("This is Error.....",payload);
            console.log("Request Rejected")
            state.loading = false;
            state.error = payload.error;
        },
        
        //for getting all companies
        [getCompanies.pending]:(state,{payload})=>{
            state.loading = true;
        },
        [getCompanies.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.error){
                state.error = payload.error;
            }else{
                state.cmpList_msg= payload.message;
                state.company_data = payload.companies;
                state.count = payload.count;
            }
        },
        [getCompanies.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload.error;
        },

        //for getting single Company
        [getCompanyDetails.pending]:(state,{payload})=>{
            state.loading = true;
            state.error = '';
            state.cmpDetail_msg = '';
            state.company_details = ''
        },
        [getCompanyDetails.fulfilled]:(state,{payload})=>{
            state.loading = false;
            if(payload.error){
                state.error = payload.error;
                state.cmpCreate_msg = '';
                state.company_details = ''
            }else{
                state.cmpDetail_msg_msg= payload.message;
                state.company_details = payload.compDetails;
                state.error = '';
            }
        },
        [getCompanyDetails.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload.error;
            state.cmpDetail_msg = '';
            state.company_details = '';
        },
    },
});

export default companySlice.reducer;
export const {clearState} = companySlice.actions;