import { instructorService } from "@/services/instructor";
import { AppState } from "@/store";
import { IInstructor } from "@/types/instructor";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InstructorState = {
  instructors: IInstructor[] | [];
  loading: {
    getInstructors: boolean;
  };
};

const initialState: InstructorState = {
  instructors: [],
  loading: {
    getInstructors: false,
  },
};

const { actions, reducer: instructorReducer } = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetInstructors.fulfilled, (state, action) => {
        state.instructors = action.payload?.instructors;
        state.loading.getInstructors = false;
      })
      .addCase(handleGetInstructors.pending, (state) => {
        state.loading.getInstructors = true;
      })
      .addCase(handleGetInstructors.rejected, (state) => {
        state.loading.getInstructors = false;
      });
  },
});

export const handleGetInstructors = createAsyncThunk(
  "auth/getInstructors",
  async (_, thunkApi) => {
    try {
      const res = await instructorService.getInstructors({});
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const instructorActions = { ...actions, handleGetInstructors };

const instructorsSelector = (state: AppState) => state.instructor.instructors;

export { instructorActions, instructorReducer, instructorsSelector };
