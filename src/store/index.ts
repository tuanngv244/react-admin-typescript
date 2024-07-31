import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import CustomizerReducer from "./customizer/CustomizerSlice";
import { instructorReducer } from "./instructor/InstructorSlice";

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    instructor: instructorReducer,
  },
});

// https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();

export default store;
