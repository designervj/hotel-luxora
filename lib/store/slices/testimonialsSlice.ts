import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Testimonial } from "@/app/components/types";

interface TestimonialsState {
    testimonials: Testimonial[];
    loading: boolean;
    error: string | null;
}

const initialState: TestimonialsState = {
    testimonials: [],
    loading: false,
    error: null,
};

export const fetchTestimonials = createAsyncThunk(
    "testimonials/fetchTestimonials",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/testimonials");
            if (!res.ok) throw new Error("Failed to fetch testimonials");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load testimonials");
        }
    }
);

export const submitTestimonial = createAsyncThunk(
    "testimonials/submitTestimonial",
    async (payload: Omit<Testimonial, "id" | "createdAt">, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/testimonials", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) throw new Error("Failed to submit testimonial");
            const data = await res.json();
            return data.testimonial as Testimonial;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to submit testimonial");
        }
    }
);

export const testimonialsSlice = createSlice({
    name: "testimonials",
    initialState,
    reducers: {
        setTestimonials: (state, action: PayloadAction<Testimonial[]>) => {
            state.testimonials = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchTestimonials
            .addCase(fetchTestimonials.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTestimonials.fulfilled, (state, action) => {
                state.loading = false;
                state.testimonials = action.payload;
            })
            .addCase(fetchTestimonials.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // submitTestimonial
            .addCase(submitTestimonial.fulfilled, (state, action) => {
                if (action.payload) {
                    state.testimonials.unshift(action.payload);
                }
            });
    },
});

export const { setTestimonials } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
