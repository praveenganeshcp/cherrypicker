import { CherrypickRequest } from "@cherrypicker/request-manager-fe";
import { createAction, props } from "@ngrx/store";

export const fetchAllRequestsAction = createAction(
  "Fetch All cherrypick requests"
);

export const allRequestsFetchedAction = createAction(
  "All Cherrypick requests fetched",
  props<{ requests: CherrypickRequest[] }>()
);

export const errorInFetchingAllRequestAction = createAction(
  "Error in fetching all requests",
  props<{ error: string }>()
);
