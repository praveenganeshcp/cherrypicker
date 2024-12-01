import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Action, ActionCreator, Store } from "@ngrx/store";
import { Observable, Subject, map, merge, take, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StoreActionDispatcher {
  constructor(private store: Store, private actions: Actions) {}

  public dispatchAction(action: Action) {
    this.store.dispatch(action);
  }

  public dispatchAsyncAction<S extends ActionCreator, E extends ActionCreator>(
    action: Action,
    successAction: S,
    errorAction: E,
    loadingSignal: Subject<boolean>
  ): Observable<ReturnType<S>> {
    const successActionListener = this.actions.pipe(ofType(successAction));
    const errorActionListener = this.actions.pipe(
      ofType(errorAction),
      map((action) => {
        throw action;
      })
    );
    loadingSignal.next(true);
    this.store.dispatch(action);
    return merge(successActionListener, errorActionListener).pipe(
      take(1),
      tap({
        next: () => {
          loadingSignal.next(false);
        },
        error: () => {
          loadingSignal.next(false);
        },
      })
    );
  }
}
