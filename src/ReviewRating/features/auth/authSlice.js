import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  message: "",
  token: "",
  user: "",
  loading: "",
  error: "",
  forget_message: "",
};

//For SignUp

export const signUpUser = createAsyncThunk(
  "users/signUpUser",
  async (requestData, { rejectWithValue }) => {
    //Make Api Call with Axios
    console.log(requestData);
    const response = await axios.post(
      "http://localhost:9000/user/registerUser",
      requestData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    return response;
  }
);

//For SignIn

export const SignInUser = createAsyncThunk(
  "user/signInUser",
  async (body, thunkAPI) => {
    const reResult = await fetch("http://localhost:9000/user/userLogin", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let data = await reResult.json();
    if (data.success) {
      console.log("res result is", reResult);
      console.log("data is", data);
      // for error message
      console.log("***", data.success, data);
      return data;
    } else {
      console.log("wrong data", data);
      return thunkAPI.rejectWithValue(data);
    }
  }
);

// For Forget Password

export const forgetPassword = createAsyncThunk(
  "users/forgotPassword",
  async (requestData, { rejectWithValue }) => {
    const response = await axios.post(
      "http://localhost:9000/send-reset-password-email",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
);

// For Reset Password

export const resetPassword = createAsyncThunk(
  "users/reset",
  async (requestData, { rejectWithValue }) => {
    const response = await axios.post(
      "http://localhost:9000/send-reset-password",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
);

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.message = "";
      state.error = "";
    },
  },

  extraReducers: {
    // For SignIn reducers for action send by createAsyncThunk

    [SignInUser.pending]: (state) => {
      state.loading = true;
    },
    [SignInUser.fulfilled]: (state, { payload }) => {
      // console.log("this is state", state);
      state.loading = false;
      console.log("payload fulfilled:", payload);
      // console.log(typeof payload);
      // console.log("_", payload.success);
      if (payload.success) {
        console.log("inside payload success");
        state.message = payload.message;
        state.token = payload.token;
        state.user = payload.userData;
        localStorage.setItem("message", payload.message);
        localStorage.setItem("user", JSON.stringify(payload.userData));
        localStorage.setItem("token", payload.token);
        console.log("successful");
      } else {
        state.error = payload.error;
      }
    },
    [SignInUser.rejected]: (state, { payload }) => {
      console.log("this is rejected", payload);
      state.loading = false;
      state.error = payload.message;
      state.message = "";
    },

    // For SignUp reducers for action send by createAsyncThunk

    [signUpUser.pending]: (state, { payload }) => {
      console.log("Loading.....");
      state.loading = true;
    },
    [signUpUser.fulfilled]: (state, { payload }) => {
      console.log("Signup Done", payload);
      state.loading = false;
      state.message = payload.data.message;
    },
    [signUpUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error.message;
    },

    // For Forgot The Password reducers , action send by createAsyncThunk

    [forgetPassword.pending]: (state) => {
      state.loading = true;
    },
    [forgetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.forget_message = payload.data.message;
    },
    [forgetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error.message;
    },

    // For Reset The Password Reducers , action send by createAsyncThunk

    [resetPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log("fulfilled: ", payload);
      state.message = payload.data.message;
    },
    [resetPassword.rejected]: (state, payload) => {
      state.loading = false;
      console.log("rejected: ", payload);
      state.error = payload.error.message;
    },
  },
});

export default authSlice.reducer;
export const { clearState } = authSlice.actions;
