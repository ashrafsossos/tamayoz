import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialState = {
    loading: false,
    Authinticate : localStorage.getItem("Authinticate") || false,
    token: localStorage.getItem("token"),
    error: ""
}

export const login = createAsyncThunk("login/loginUser", async (data, { rejectWithValue }) => {
    try {
    const role = localStorage.getItem('role')
    if(role === 'student'){      
    const response = await axios.post(`${process.env.REACT_APP_API_URL}student_login`, data);
    return response.data;}
    if(role === 'teacher'){      
        const response = await axios.post(`${process.env.REACT_APP_API_URL}teatcherLogin`, data);
        return response.data;}
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return rejectWithValue({ message: error.response.data.message });
      }
      throw error;
    }
  });

    export const logout = createAsyncThunk("logout/logoutUser", async (_, {getState}) => {
        const token = getState().auth.token
        const role = localStorage.getItem('role')
       if(role === 'student'){      
        return axios.post(`${process.env.REACT_APP_API_URL}logoutClient`, {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {return res.data})}
        if(role === 'teacher'){      
            return axios.post(`${process.env.REACT_APP_API_URL}logoutTeacher`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {return res.data})}
    })

    const authReducer = createSlice({
    name: "auth",
    initialState : initialState,
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            state.loading = true
            state.Authinticate = false
            state.error = ''
            state.token = null
        })
        builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "An error occurred while logging in. Please try again.";
        state.Authinticate = false;
        state.token = null;
        if(state.error === "Your account has been restricted, please verify first."){
            localStorage.setItem("btn",true);
        }
        else{
            localStorage.setItem("btn",false);
        }
        });

        builder.addCase(login.fulfilled, (state, action) => {
            if(action.payload.status){
                state.loading = false
                state.Authinticate = true
                state.token = action.payload.token
                state.error = action.payload.message
                localStorage.setItem('Authinticate', true);
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem("information", JSON.stringify(action.payload.client));
                localStorage.setItem("image", JSON.stringify(action.payload.client.image));
            }
            else{ 
                state.loading = false
                state.error = action.payload.message
                state.isAuth = false
                state.token = null
                state.rule = null
            }
        })

        // logout 
        builder.addCase(logout.pending, (state) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(logout.fulfilled,(state) => {
            state.loading = false
            state.error = ""
            state.Authinticate = false
            state.token = null
            localStorage.clear()
        } )
        builder.addCase(logout.rejected, (state) => {
            state.loading = false
            state.error = "Logout Faild"
            state.isAuth = true
        })
    }
})
export const authAction = authReducer.actions;
export default authReducer.reducer