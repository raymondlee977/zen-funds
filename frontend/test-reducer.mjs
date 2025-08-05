// test-reducer.mjs
import { accountGroupsReducer, deleteAccountGroup } from "./src/slices/accountGroupsSlice.js";

const id = "cat1";
const original = { id, name: "Groceries" };

// 1) Simulate the “pending” state where the item was optimistically removed
const pendingState = {
  entities: {},   
  ids: [],
  tempDelete: { [id]: original },
  isLoading: true,
  isError: false,
  message: ""
};

// 2) Craft the rejected action
const action = {
  type: deleteAccountGroup.rejected.type,
  payload: "Network error",
  error: { message: "Network error" },
  meta: { arg: id }
};

// 3) Run your reducer
const nextState = accountGroupsReducer(pendingState, action);

// 4) Inspect / assert
console.log("Restored entity:", nextState.entities[id]);
console.log("Error flag:", nextState.isError, "Message:", nextState.message);
console.log("Stash cleaned:", nextState.tempDelete[id] === undefined);