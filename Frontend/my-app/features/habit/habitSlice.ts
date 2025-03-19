import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchHabits } from './habitAPI';


type Habit = {
  title: string;
  description: string;
}

type HabitState = {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: []
};

export const fetchHabitsThunk = createAsyncThunk('habit/fetchHabits', async () => {
    const response = await fetchHabits();
    const responseJson = await response.json();
    return responseJson;
});
const habitSlice = createSlice({
  name: 'habit',
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits = action.payload;
    },
  },
    extraReducers: (builder) => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.habits = action.payload;
        });
    }
});

export const { addHabit } = habitSlice.actions;
export default habitSlice.reducer;