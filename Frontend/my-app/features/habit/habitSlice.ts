import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchHabits } from './habitAPI';


type Habit = {
  title: string;
  description: string;
  createdAt: string;
  days: number;
  lastDone: string;
  lastUpdated: string;
}

type HabitState = {
  habits: Habit[];
  status: Record<string, "idle" | "loading" | "succeeded" | "failed">;
  error: Record<string, string | null>;
}

const initialState: HabitState = {
  habits: [],
  status: {},
  error: {},
};

export const fetchHabitsThunk = createAsyncThunk('habit/fetchHabits', async () => {
    const response = await fetchHabits();
    const responseJson = await response.json();
    return responseJson;
});

export const markAsDoneThunk = createAsyncThunk('habit/markAsDone', async (habitId: string, {rejectWithValue}) => {

  const response = await fetch(`http://localhost:3001/habits/markasdone/${habitId}`, {
    method: 'PATCH',
  });
  const responseJson = await response.json();
  if (!response.ok) {
    return rejectWithValue("Failed to mark habit as done");
  }else if(responseJson.message.toString() === "Habit restarted"){
    return rejectWithValue(responseJson.message);
  }else{
    return responseJson;
  }
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
        }).addCase(markAsDoneThunk.fulfilled, (state, action) => {
          state.status[action.meta.arg] = "succeeded";
          state.error[action.meta.arg] = null;
        }).addCase(markAsDoneThunk.rejected, (state, action) => {  
          state.status[action.meta.arg] = "failed";
          state.error[action.meta.arg] = action.payload as string;
        });
    }
});

export const { addHabit } = habitSlice.actions;
export default habitSlice.reducer;