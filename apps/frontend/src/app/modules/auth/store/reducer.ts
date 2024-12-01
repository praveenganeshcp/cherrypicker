import { createReducer, on } from "@ngrx/store";
import { UserProfileState } from "./state";
import {
  errorInFetchingUserProfileAction,
  fetchUserProfileAction,
  githubAccountAuthorizedAction,
  userProfileFetchedAction,
} from "./actions";

const DEFAULT_STATE: UserProfileState = {
  isLoading: false,
  data: null,
  error: "",
};

export const authReducer = createReducer(
  DEFAULT_STATE,
  on(fetchUserProfileAction, (state) => ({
    error: "",
    data: null,
    isLoading: true,
  })),
  on(userProfileFetchedAction, (state, { profile }) => ({
    error: "",
    data: profile,
    isLoading: false,
  })),
  on(errorInFetchingUserProfileAction, (state, { error }) => ({
    error,
    data: null,
    isLoading: false,
  })),
  on(githubAccountAuthorizedAction, (state, { profile }) => ({
    error: "",
    data: profile,
    isLoading: false,
  }))
);
