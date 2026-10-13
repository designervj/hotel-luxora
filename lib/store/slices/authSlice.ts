import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (data.authenticated && data.user) {
                return data.user;
            }
            return null;
        } catch (err: any) {
            return rejectWithValue(err.message || "Auth check failed");
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            return true;
        } catch (err: any) {
            return rejectWithValue(err.message || "Logout failed");
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        clearAuth: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = !!action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            })
            // logoutUser
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
