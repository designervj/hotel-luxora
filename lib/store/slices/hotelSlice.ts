import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Hotel } from "@/app/components/types";

interface HotelState {
    data: Hotel | null;
    loading: boolean;
    error: string | null;
}

const initialState: HotelState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchHotelSettings = createAsyncThunk(
    "hotel/fetchHotelSettings",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/hotel-settings");
            if (!res.ok) throw new Error("Failed to fetch hotel settings");
            const data = await res.json();
            return data as Hotel;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load hotel settings");
        }
    }
);

export const updateHotelSettings = createAsyncThunk(
    "hotel/updateHotelSettings",
    async (payload: Partial<Hotel>, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/hotel-settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Failed to update hotel settings");
            const data = await res.json();
            return data.hotel || payload;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to update hotel settings");
        }
    }
);

export const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        setHotelData: (state, action: PayloadAction<Hotel>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchHotelSettings
            .addCase(fetchHotelSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHotelSettings.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload?.name) {
                    state.data = action.payload;
                }
            })
            .addCase(fetchHotelSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // updateHotelSettings
            .addCase(updateHotelSettings.fulfilled, (state, action) => {
                if (state.data) {
                    state.data = { ...state.data, ...action.payload };
                } else {
                    state.data = action.payload as Hotel;
                }
            });
    },
});

export const { setHotelData } = hotelSlice.actions;
export default hotelSlice.reducer;
