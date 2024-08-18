import { inject, Injectable } from "@angular/core";
import { CherrypickRequest, CherrypickRequestsManagerService } from "@cherrypicker/request-manager-fe";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, mergeMap, of } from "rxjs";
import { allRequestsFetchedAction, errorInFetchingAllRequestAction, fetchAllRequestsAction } from "./actions";

@Injectable()
export class CherrypickRequestsDashboardEffects {

    readonly actions$ = inject(Actions);
    readonly cherrypickRequestsManagerService = inject(CherrypickRequestsManagerService);

    fetchAllRequests = createEffect(() => this.actions$.pipe(
        ofType(fetchAllRequestsAction),
        mergeMap(() => {
            return this.cherrypickRequestsManagerService.fetchAllRequests().pipe(
              map((requests: CherrypickRequest[]) =>
                allRequestsFetchedAction({ requests: requests })
              ),
              catchError(() =>
                of(
                  errorInFetchingAllRequestAction({
                    error: 'Error in fetching requests',
                  })
                )
              )
            );
          })
    ))
}