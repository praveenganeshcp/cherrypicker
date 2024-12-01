import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { UserProfile } from "@cherrypicker/auth-fe";
import { Store } from "@ngrx/store";
import { AppState } from "apps/frontend/src/app/app.state";
import { userProfileSelector } from "../../../auth/store/selectors";
import { RouterModule } from "@angular/router";

@Component({
  selector: "cp-app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./app-header.component.html",
  styleUrl: "./app-header.component.scss",
})
export class AppHeaderComponent {
  readonly store: Store<AppState> = inject(Store);

  protected readonly userProfile$: Observable<UserProfile> = this.store.select(
    userProfileSelector
  ) as Observable<UserProfile>;
}
