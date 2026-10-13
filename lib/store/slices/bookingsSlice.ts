import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Booking, MealPlan } from "@/app/components/types";

interface BookingsState {
    myBookings: Booking[];
    mealPlans: MealPlan[];
    submitting: boolean;
    bookingSuccess: boolean;
    createdBooking: Booking | null;
    loading: boolean;
    error: string | null;
}

const initialState: BookingsState = {
    myBookings: [],
    mealPlans: [],
    submitting: false,
    bookingSuccess: false,
    createdBooking: null,
    loading: false,
    error: null,
};

export const fetchMyBookings = createAsyncThunk(
    "bookings/fetchMyBookings",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/my-bookings");
            if (!res.ok) throw new Error("Failed to fetch my bookings");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load bookings");
        }
    }
);

export const fetchMealPlans = createAsyncThunk(
    "bookings/fetchMealPlans",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/meal-plans");
            if (!res.ok) throw new Error("Failed to fetch meal plans");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load meal plans");
        }
    }
);

export const createBooking = createAsyncThunk(
    "bookings/createBooking",
    async (payload: any, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok || data.error) throw new Error(data.error || "Booking failed");
            return data.booking as Booking;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to create booking");
        }
    }
);

export const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        resetBookingState: (state) => {
            state.submitting = false;
            state.bookingSuccess = false;
            state.createdBooking = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchMyBookings
            .addCase(fetchMyBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.myBookings = action.payload;
            })
            .addCase(fetchMyBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // fetchMealPlans
            .addCase(fetchMealPlans.fulfilled, (state, action) => {
                state.mealPlans = action.payload;
            })
            // createBooking
            .addCase(createBooking.pending, (state) => {
                state.submitting = true;
                state.bookingSuccess = false;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.submitting = false;
                state.bookingSuccess = true;
                state.createdBooking = action.payload;
                if (action.payload) {
                    state.myBookings.unshift(action.payload);
                }
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.submitting = false;
                state.bookingSuccess = false;
                state.error = action.payload as string;
            });
    },
});

export const { resetBookingState } = bookingsSlice.actions;
export default bookingsSlice.reducer;
