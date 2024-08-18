import { createSelector } from "@ngrx/store";
import { AppState } from "../../../app.state";

export const profileStateSelector = (state: AppState) => state.userProfile;

// ############ Start User profile selectors ############### //

export const isProfileLoadingSelector = createSelector(
  profileStateSelector,
  (profileState) => profileState.isLoading
);

export const userProfileSelector = createSelector(
  profileStateSelector,
  (profileState) => profileState.data
);