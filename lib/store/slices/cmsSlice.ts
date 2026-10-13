import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { CMSPage } from "@/app/components/types";

interface CmsState {
    pagesBySlug: Record<string, CMSPage>;
    allPages: CMSPage[];
    loadingSlugs: Record<string, boolean>;
    loadingAll: boolean;
    error: string | null;
}

const initialState: CmsState = {
    pagesBySlug: {},
    allPages: [],
    loadingSlugs: {},
    loadingAll: false,
    error: null,
};

export const fetchPageBySlug = createAsyncThunk(
    "cms/fetchPageBySlug",
    async (slug: string, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/pages?slug=${encodeURIComponent(slug)}`);
            if (!res.ok) throw new Error(`Failed to fetch page: ${slug}`);
            const data = await res.json();
            return { slug, page: data as CMSPage | null };
        } catch (err: any) {
            return rejectWithValue({ slug, message: err.message || "Failed to load page" });
        }
    }
);

export const fetchAllPages = createAsyncThunk(
    "cms/fetchAllPages",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/pages");
            if (!res.ok) throw new Error("Failed to fetch all pages");
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err: any) {
            return rejectWithValue(err.message || "Failed to load pages");
        }
    }
);

export const cmsSlice = createSlice({
    name: "cms",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<CMSPage>) => {
            state.pagesBySlug[action.payload.slug] = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchPageBySlug
            .addCase(fetchPageBySlug.pending, (state, action) => {
                const slug = action.meta.arg;
                state.loadingSlugs[slug] = true;
            })
            .addCase(fetchPageBySlug.fulfilled, (state, action) => {
                const { slug, page } = action.payload;
                state.loadingSlugs[slug] = false;
                if (page && page.slug) {
                    state.pagesBySlug[slug] = page;
                }
            })
            .addCase(fetchPageBySlug.rejected, (state, action) => {
                const slug = action.meta.arg;
                state.loadingSlugs[slug] = false;
                state.error = (action.payload as any)?.message || "Failed to load page";
            })
            // fetchAllPages
            .addCase(fetchAllPages.pending, (state) => {
                state.loadingAll = true;
            })
            .addCase(fetchAllPages.fulfilled, (state, action) => {
                state.loadingAll = false;
                state.allPages = action.payload;
                action.payload.forEach((p) => {
                    if (p.slug) state.pagesBySlug[p.slug] = p;
                });
            })
            .addCase(fetchAllPages.rejected, (state, action) => {
                state.loadingAll = false;
                state.error = action.payload as string;
            });
    },
});

export const { setPage } = cmsSlice.actions;
export default cmsSlice.reducer;
