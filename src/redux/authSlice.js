import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// User register API call
export const userSignup = createAsyncThunk(
    "auth/userSignup",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`,
                data,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response && response.data.status === 200) {
                return response.data
            } else {
                return rejectWithValue(response.data?.message || "Something went wrong");
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Signup failed"
            );
        }
    }
);

// User register API call
export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
                data,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response && response.data.status === 200) {
                return response.data
            } else {
                return rejectWithValue(response.data?.message || "Something went wrong");
            }
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Signup failed"
            );
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            });
    },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
