import { authService } from "@/services/auth";
import { ILoginFormData } from "@/types/auth";
import tokenMethod from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface StateType {}

const initialState: StateType = {};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: StateType) => {
      state = { ...initialState };
    },
  },
});

export const handleLogin = createAsyncThunk(
  "auth/login",
  async (
    args: {
      payload: ILoginFormData;
      onSuccess?: VoidFunction;
      onFailed?: VoidFunction;
    },
    thunkApi
  ) => {
    const { payload, onSuccess, onFailed } = args;
    try {
      const res = await authService.login(payload);
      const { id, token } = res?.data || {};
      thunkApi.dispatch(handleGetProfile(id));
      tokenMethod.set({
        id: id,
        accessToken: token,
        refreshToken: token,
        countRefreshToken: 0,
      });
      onSuccess?.();
      return res?.data;
    } catch (error) {
      onFailed?.();
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const handleGetProfile = createAsyncThunk(
  "auth/getProfile",
  async (id: string, thunkApi) => {
    try {
      const profileRes = await authService.getProfile(id);
      return profileRes;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const authActions = {
  ...AuthSlice.actions,
  handleLogin,
  handleGetProfile,
};

export default AuthSlice.reducer;
