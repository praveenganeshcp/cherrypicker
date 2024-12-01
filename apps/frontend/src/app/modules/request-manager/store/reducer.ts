import { createReducer, on } from "@ngrx/store";
import { CherrypickRequestDashboardState } from "./state";
import {
  allRequestsFetchedAction,
  errorInFetchingAllRequestAction,
  fetchAllRequestsAction,
} from "./actions";

const DEFAULT_STATE: CherrypickRequestDashboardState = {
  data: [],
  isLoading: false,
  error: "",
};

export const cherrypickRequestsDashboardReducer = createReducer(
  DEFAULT_STATE,
  on(fetchAllRequestsAction, (state) => ({
    error: "",
    isLoading: true,
    data: [],
  })),
  on(allRequestsFetchedAction, (state, { requests }) => ({
    error: "",
    isLoading: false,
    data: requests,
  })),
  on(errorInFetchingAllRequestAction, (state, { error }) => ({
    error,
    isLoading: false,
    data: [],
  }))
);
