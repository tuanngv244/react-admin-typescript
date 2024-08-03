import { contactService } from "@/services/contact";
import { dashboardService } from "@/services/dashboard";
import { orderService } from "@/services/order";
import { IContact } from "@/types/contact";
import { IMemberStatistic, IRevenueStatistic } from "@/types/dashboard";
import { IOrder, IOrderQuery } from "@/types/order";
import { totalRevenueYear } from "@/utils/calculator";
import { shouldUpdate } from "@/utils/validation";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

interface StateType {
  memberStatistic?: IMemberStatistic;
  memberStatisticLoading: boolean;
  revenueStatistic?: IRevenueStatistic;
  totalRevenueData?: { thisYear: number; prevYear: number };
  revenueStatisticLoading?: boolean;
  lastOrders?: IOrder[] | [];
  lastOrderLoading?: boolean;
  lastContacts?: IContact[] | [];
  lastContactLoading?: boolean;
}

const initialState: StateType = {
  memberStatisticLoading: false,
  revenueStatisticLoading: false,
  lastOrders: [],
  lastOrderLoading: false,
  lastContacts: [],
  lastContactLoading: false,
};

const { actions, reducer: dashboardReducer } = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: (state: StateType) => {
      state = { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      // ---- Get member statistic ---- //
      .addCase(handleGetMemberStatistic.fulfilled, (state, action) => {
        const getState = current(state);
        if (shouldUpdate(getState?.memberStatistic, action.payload)) {
          state.memberStatistic = action.payload;
        }
        state.memberStatisticLoading = false;
      })
      .addCase(handleGetMemberStatistic.pending, (state) => {
        state.memberStatisticLoading = true;
      })
      .addCase(handleGetMemberStatistic.rejected, (state) => {
        state.memberStatisticLoading = false;
      })
      // ---- Get revenue statistic ---- //
      .addCase(handleGetRevenueStatistic.fulfilled, (state, action) => {
        const getState = current(state);
        if (shouldUpdate(getState?.revenueStatistic, action.payload)) {
          state.revenueStatistic = action.payload;
          state.totalRevenueData = {
            thisYear: totalRevenueYear(action.payload.thisYear),
            prevYear: totalRevenueYear(action.payload.prevYear),
          };
        }
        state.revenueStatisticLoading = false;
      })
      .addCase(handleGetRevenueStatistic.pending, (state) => {
        state.revenueStatisticLoading = true;
      })
      .addCase(handleGetRevenueStatistic.rejected, (state) => {
        state.revenueStatisticLoading = false;
      })
      // ---- Get last orders ---- //
      .addCase(handleGetLastOrders.fulfilled, (state, action) => {
        const getState = current(state);
        if (shouldUpdate(getState?.lastOrders, action.payload)) {
          state.lastOrders = action.payload;
        }
        state.lastOrderLoading = false;
      })
      .addCase(handleGetLastOrders.pending, (state) => {
        state.lastOrderLoading = true;
      })
      .addCase(handleGetLastOrders.rejected, (state) => {
        state.lastOrderLoading = false;
      })
      // ---- Get last contacts ---- //
      .addCase(handleGetLastContacts.fulfilled, (state, action) => {
        const getState = current(state);
        if (shouldUpdate(getState?.lastContacts, action.payload)) {
          state.lastContacts = action.payload;
        }
        state.lastContactLoading = false;
      })
      .addCase(handleGetLastContacts.pending, (state) => {
        state.lastContactLoading = true;
      })
      .addCase(handleGetLastContacts.rejected, (state) => {
        state.lastContactLoading = false;
      });
  },
});

export const handleGetMemberStatistic = createAsyncThunk(
  "dashboard/memberStatistic",
  async (
    args: {
      fromDate?: string;
      toDate?: string;
    },
    thunkApi
  ) => {
    try {
      const res = await dashboardService.getMemberStatistic(args);
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const handleGetRevenueStatistic = createAsyncThunk(
  "dashboard/revenueStatistic",
  async (
    args: {
      year?: number;
    },
    thunkApi
  ) => {
    try {
      const res = await dashboardService.getRevenuesStatistic(args);
      return res?.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const handleGetLastOrders = createAsyncThunk(
  "dashboard/orders",
  async (args: Partial<IOrderQuery>, thunkApi) => {
    try {
      const res = await orderService.getOrders(args);
      return res?.data?.orders;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const handleGetLastContacts = createAsyncThunk(
  "dashboard/contacts",
  async (args: Partial<IOrderQuery>, thunkApi) => {
    try {
      const res = await contactService.getContacts(args);
      return res?.data?.subscribes;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const dashboardActions = {
  actions,
  handleGetMemberStatistic,
  handleGetRevenueStatistic,
  handleGetLastOrders,
  handleGetLastContacts,
};
export { dashboardActions, dashboardReducer };
