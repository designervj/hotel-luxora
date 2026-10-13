import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Room, Availability } from "@/app/components/types";

interface RoomsState {
    rooms: Room[];
    selectedRoom: Room | null;
    availability: Record<string, Availability>;
    loading: boolean;
    error: string | null;
}

const initialState: RoomsState = {
    rooms: [],
    selectedRoom: null,
    availability: {},
    loading: false,
    error: null,
};

export const fetchRooms = createAsyncThunk(
    "rooms/fetchRooms",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/room-types");
            if (!res.ok) throw new Error("Failed to fetch rooms");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load rooms");
        }
    }
);

export const fetchAvailability = createAsyncThunk(
    "rooms/fetchAvailability",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/availability");
            if (!res.ok) throw new Error("Failed to fetch room availability");
            const data = await res.json();
            return data as Record<string, Availability>;
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load availability");
        }
    }
);

export const roomsSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
            state.selectedRoom = action.payload;
        },
        setSelectedRoomById: (state, action: PayloadAction<string>) => {
            state.selectedRoom = state.rooms.find(r => r.id === action.payload) || null;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchRooms
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // fetchAvailability
            .addCase(fetchAvailability.fulfilled, (state, action) => {
                state.availability = action.payload;
            });
    },
});

export const { setSelectedRoom, setSelectedRoomById } = roomsSlice.actions;
export default roomsSlice.reducer;
