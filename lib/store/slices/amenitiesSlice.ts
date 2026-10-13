import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AmenityCat } from "@/app/components/types";

interface AmenitiesState {
    categories: AmenityCat[];
    loading: boolean;
    error: string | null;
}

const initialState: AmenitiesState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchAmenities = createAsyncThunk(
    "amenities/fetchAmenities",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/amenities");
            if (!res.ok) throw new Error("Failed to fetch amenities");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load amenities");
        }
    }
);

export const amenitiesSlice = createSlice({
    name: "amenities",
    initialState,
    reducers: {
        setAmenities: (state, action: PayloadAction<AmenityCat[]>) => {
            state.categories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAmenities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAmenities.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchAmenities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setAmenities } = amenitiesSlice.actions;
export default amenitiesSlice.reducer;
