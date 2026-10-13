import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "./slices/hotelSlice";
import roomsReducer from "./slices/roomsSlice";
import amenitiesReducer from "./slices/amenitiesSlice";
import galleryReducer from "./slices/gallerySlice";
import testimonialsReducer from "./slices/testimonialsSlice";
import nearbyReducer from "./slices/nearbySlice";
import cmsReducer from "./slices/cmsSlice";
import bookingsReducer from "./slices/bookingsSlice";
import authReducer from "./slices/authSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            hotel: hotelReducer,
            rooms: roomsReducer,
            amenities: amenitiesReducer,
            gallery: galleryReducer,
            testimonials: testimonialsReducer,
            nearby: nearbyReducer,
            cms: cmsReducer,
            bookings: bookingsReducer,
            auth: authReducer,
        },
        devTools: process.env.NODE_ENV !== "production",
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
