import { AfterViewInit, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreActionDispatcher } from "../../commons/services/action-dispatcher";
import {
  authorizeGithubAccountAction,
  errorInAuthorizingGithubAccountAction,
  githubAccountAuthorizedAction,
} from "../store/actions";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "cp-oauth-callback",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./oauth-callback.component.html",
  styleUrl: "./oauth-callback.component.scss",
})
export class OauthCallbackComponent implements AfterViewInit {
  readonly activatedRoute = inject(ActivatedRoute);
  readonly actionsDispatcher = inject(StoreActionDispatcher);
  readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly router = inject(Router);

  ngAfterViewInit(): void {
    this.actionsDispatcher
      .dispatchAsyncAction(
        authorizeGithubAccountAction({
          exchangeCode: this.activatedRoute.snapshot.queryParams["code"],
        }),
        githubAccountAuthorizedAction,
        errorInAuthorizingGithubAccountAction,
        this.loading$
      )
      .subscribe({
        next: (profile) => {
          this.router.navigate(["app", "cherrypick-requests"]);
        },
      });
  }
}
