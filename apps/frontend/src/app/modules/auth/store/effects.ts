import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  authorizeGithubAccountAction,
  errorInAuthorizingGithubAccountAction,
  errorInFetchingUserProfileAction,
  fetchUserProfileAction,
  githubAccountAuthorizedAction,
  userProfileFetchedAction,
} from "./actions";
import { AuthService, UserProfile } from "@cherrypicker/auth-fe";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class AuthEffects {
  constructor(private readonly authService: AuthService) {}

  readonly actions$ = inject(Actions);

  fetchProfile = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUserProfileAction),
      mergeMap(() => {
        return this.authService.fetchProfile().pipe(
          map((userProfile: UserProfile) =>
            userProfileFetchedAction({ profile: userProfile })
          ),
          catchError(() =>
            of(
              errorInFetchingUserProfileAction({
                error: "Error in fetching profile",
              })
            )
          )
        );
      })
    )
  );

  authorizeGithubAccount = createEffect(() =>
    this.actions$.pipe(
      ofType(authorizeGithubAccountAction),
      mergeMap(({ exchangeCode }) => {
        return this.authService.authorizeGithubAccount(exchangeCode).pipe(
          map((userProfile: UserProfile) =>
            githubAccountAuthorizedAction({ profile: userProfile })
          ),
          catchError(() =>
            of(
              errorInAuthorizingGithubAccountAction({
                error: "Error in authorizing account",
              })
            )
          )
        );
      })
    )
  );
}
