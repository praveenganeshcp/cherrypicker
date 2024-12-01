import { Component, inject, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "./app.state";
import { fetchUserProfileAction } from "./modules/auth/store/actions";
import { Observable } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { isProfileLoadingSelector } from "./modules/auth/store/selectors";

@Component({
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe],
  styles: [
    `
      .app-root,
      .user-profile-loader {
        width: 100%;
        height: 100%;
      }
      .user-profile-loader {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
      }
    `,
  ],
  selector: "cp-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private readonly store: Store<AppState> = inject(Store);

  ngOnInit() {
    this.store.dispatch(fetchUserProfileAction());
  }

  protected readonly isProfileLoading$: Observable<boolean> = this.store.select(
    isProfileLoadingSelector
  );
}
