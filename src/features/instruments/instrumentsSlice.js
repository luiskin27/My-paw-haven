import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    fetchInstrumentsApi, 
    fetchInstrumentByIdApi,
    createInstrumentApi,
    updateInstrumentApi,
    deleteInstrumentApi 
} from "../../api/instrumentsApi";

// 📃 Загрузка списка
export const fetchInstruments = createAsyncThunk(
    "instruments/fetchAll",
    async () => {
        return await fetchInstrumentsApi();
    }
);

// 🔍 Загрузка одного инструмента
export const fetchInstrumentById = createAsyncThunk(
    "instruments/fetchById",
    async (id) => {
        return await fetchInstrumentByIdApi(id);
    }
);

// ➕ Создание инструмента
export const createInstrument = createAsyncThunk(
    "instruments/create",
    async (instrument) => {
        return await createInstrumentApi(instrument);
    }
);

// ✏️ Обновление инструмента
export const updateInstrument = createAsyncThunk(
    "instruments/update",
    async (instrument) => {
        return await updateInstrumentApi(instrument);
    }
);

// ❌ Удаление инструмента
export const deleteInstrument = createAsyncThunk(
    "instruments/delete",
    async (id) => {
        return await deleteInstrumentApi(id);
    }
);

const instrumentsSlice = createSlice({
    name: "instruments",
    initialState: {
        items: [],
        selectedInstrument: null,
        status: "idle",
        error: null
    },
    reducers: {
        clearSelectedInstrument(state) {
            state.selectedInstrument = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // список
            .addCase(fetchInstruments.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInstruments.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchInstruments.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // один инструмент
            .addCase(fetchInstrumentById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInstrumentById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedInstrument = action.payload;
            })
            .addCase(fetchInstrumentById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // создание
            .addCase(createInstrument.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            // обновление
            .addCase(updateInstrument.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                state.selectedInstrument = action.payload;
            })

            // удаление
            .addCase(deleteInstrument.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
                if (state.selectedInstrument?.id === action.payload) {
                    state.selectedInstrument = null;
                }
            });
    }
});

export const { clearSelectedInstrument } = instrumentsSlice.actions;
export default instrumentsSlice.reducer;