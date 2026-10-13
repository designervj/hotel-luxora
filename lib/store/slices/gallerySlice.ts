import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { GalleryImage } from "@/app/components/types";

interface GalleryState {
    images: GalleryImage[];
    loading: boolean;
    error: string | null;
}

const initialState: GalleryState = {
    images: [],
    loading: false,
    error: null,
};

export const fetchGallery = createAsyncThunk(
    "gallery/fetchGallery",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/gallery");
            if (!res.ok) throw new Error("Failed to fetch gallery");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load gallery images");
        }
    }
);

export const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        setGalleryImages: (state, action: PayloadAction<GalleryImage[]>) => {
            state.images = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGallery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGallery.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            })
            .addCase(fetchGallery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setGalleryImages } = gallerySlice.actions;
export default gallerySlice.reducer;
