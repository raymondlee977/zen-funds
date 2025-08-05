import axiosClient from "../components/api/axiosClient";
import { createAsyncThunk, createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";

// Entity adapter
const accountGroupsAdapter = createEntityAdapter({
  selectId: accountGroup => accountGroup._id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = accountGroupsAdapter.getInitialState({
  isLoading: false,
  isError: false,
  message: '',
  tempIds: [],
  tempDelete: {},
  tempUpdate: {},
})

// Fetching accountGroups from backend
export const fetchAccountGroups = createAsyncThunk(
  'accountGroups/fetchAll',
  async(_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get('/api/accountGroups');
      return data;
    } catch (error) {
      const message = error.response || 
        error.response?.data || 
        error.response?.data?.message ||
        error.message;
      return rejectWithValue(message);
    };
  }
);

// Creating accountGroup from backend
export const createAccountGroup = createAsyncThunk(
  'accountGroups/createOne',
  async (accountGroupData, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post('api/accountGroups', accountGroupData);
      return data;
    } catch (error) {
      const message = error.response || 
        error.response?.data || 
        error.response?.data?.message ||
        error.message;
      return rejectWithValue(message);
    };
  }
);

export const updateAccountGroup = createAsyncThunk(
  'accountGroups/updateAccountGroup',
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.patch(`/api/accountGroups/${id}`, changes);
      return data;
    } catch (error) {
      const message = error.response || 
        error.response?.data || 
        error.response?.data?.message ||
        error.message;
      return rejectWithValue(message);
    };
  }
)

export const deleteAccountGroup = createAsyncThunk(
  'accountGroups/deleteOne',
  async (id, { rejectWithValue }) => {
    try {
      await axiosClient.delete(`/api/accountGroups/${id}`);
      return id;
    } catch (error) {
      const message = error.response || 
        error.response?.data || 
        error.response?.data?.message ||
        error.message;
      return rejectWithValue(message);
    };
  }
)

const accountGroupsSlice = createSlice({
  name: 'accountGroups',
  initialState,
  reducers: {
    reset: (state) => {
      accountGroupsAdapter.removeAll(state);
      state.isLoading = false;
      state.isError = false;
      state.message = '';
      state.tempIds = [];
      state.tempDelete = {};
      state.tempUpdate = {};
    },
  },
  extraReducers: (builder) => {
    // FETCH ALL
    builder
      .addCase(fetchAccountGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAccountGroups.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        accountGroupsAdapter.setAll(state, payload);
      })
      .addCase(fetchAccountGroups.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload || 'Failed to load accountGroups';
        state.accountGroups = null;
      })

    // CREATE ONE
      .addCase(createAccountGroup.pending, (state, { meta: { arg } }) => {
        const tempId = nanoid();
        state.tempIds.push(tempId);
        accountGroupsAdapter.addOne(state, { _id: tempId, ...arg, });
        state.isLoading = true;
      })
      .addCase(createAccountGroup.fulfilled, (state, { payload }) => {
        const tempId = state.tempIds.shift();
        accountGroupsAdapter.removeOne(state, tempId);
        accountGroupsAdapter.addOne(state, payload);
        state.isLoading = false;
      })
      .addCase(createAccountGroup.rejected, (state, { payload }) => {        
        const tempId = state.tempIds.shift();
        accountGroupsAdapter.removeOne(state, tempId);
        state.isLoading = false;
        state.isError = true;
        state.isError = payload || 'Failed to create accountGroup';
      })
    
      // DELETE ONE
      .addCase(deleteAccountGroup.pending, (state, { meta: { arg: id } }) => {
        state.isLoading = true;
        state.tempDelete[id] = { ...state.entities[id] }
        accountGroupsAdapter.removeOne(state, id);
      })
      .addCase(deleteAccountGroup.fulfilled, (state, { meta: { arg: id } }) => {
        state.isLoading = false;
        delete state.tempDelete[id];
      })
      .addCase(deleteAccountGroup.rejected, (state, action) => {
        const id = action.meta.arg;
        const message = action.payload || action.error.message;
        state.isLoading = false;
        state.isError = true;
        state.message = message;
        accountGroupsAdapter.addOne(state, state.tempDelete[id]);
        delete state.tempDelete[id];
      })
    
    // UPDATE ONE
      .addCase(updateAccountGroup.pending, (state, { meta: { arg } }) => {
        const { id, changes } = arg;
        state.isLoading = true;
        state.tempUpdate[id] = { ...state.entities[id] }
        accountGroupsAdapter.updateOne(state, { id, changes });
      })
      .addCase(updateAccountGroup.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        accountGroupsAdapter.upsertOne(state, payload);
        delete state.tempUpdate[payload._id];
      })
      .addCase(updateAccountGroup.rejected, (state, action) => {
        const { id } = action.meta.arg;
        const message = action.payload || action.error.message;
        state.isLoading = false;
        state.isError = true;
        state.message = message;
        accountGroupsAdapter.upsertOne(state, state.tempUpdate[id]);
        delete state.tempUpdate[id];
      })
  },
});

export const { reset } = accountGroupsSlice.actions
export const {
  selectAll: selectAllAccountGroups,
  selectById: selectAccountGroupById,
  selectIds: selectAccountGroupIds,
} = accountGroupsAdapter.getSelectors(state => state.accountGroups);

export default accountGroupsSlice.reducer;