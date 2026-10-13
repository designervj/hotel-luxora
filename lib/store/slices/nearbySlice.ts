import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { NearbyPlace } from "@/app/components/types";

interface NearbyState {
    places: NearbyPlace[];
    loading: boolean;
    error: string | null;
}

const initialState: NearbyState = {
    places: [],
    loading: false,
    error: null,
};

export const fetchNearbyPlaces = createAsyncThunk(
    "nearby/fetchNearbyPlaces",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/nearby");
            if (!res.ok) throw new Error("Failed to fetch nearby places");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load nearby places");
        }
    }
);

export const nearbySlice = createSlice({
    name: "nearby",
    initialState,
    reducers: {
        setNearbyPlaces: (state, action: PayloadAction<NearbyPlace[]>) => {
            state.places = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNearbyPlaces.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNearbyPlaces.fulfilled, (state, action) => {
                state.loading = false;
                state.places = action.payload;
            })
            .addCase(fetchNearbyPlaces.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setNearbyPlaces } = nearbySlice.actions;
export default nearbySlice.reducer;
