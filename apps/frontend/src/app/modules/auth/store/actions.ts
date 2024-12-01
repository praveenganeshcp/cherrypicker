import { UserProfile } from "@cherrypicker/auth-fe";
import { createAction, props } from "@ngrx/store";

export const fetchUserProfileAction = createAction("fetch profile");

export const userProfileFetchedAction = createAction(
  "User profile fetched",
  props<{ profile: UserProfile }>()
);

export const errorInFetchingUserProfileAction = createAction(
  "Error in fetching profile",
  props<{ error: string }>()
);

export const authorizeGithubAccountAction = createAction(
  "Authorize github account",
  props<{ exchangeCode: string }>()
);

export const githubAccountAuthorizedAction = createAction(
  "Github acccount authorized",
  props<{ profile: UserProfile }>()
);

export const errorInAuthorizingGithubAccountAction = createAction(
  "Error in authorizing github account",
  props<{ error: string }>()
);
