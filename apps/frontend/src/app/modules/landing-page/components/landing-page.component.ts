import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { userProfileSelector } from '../../auth/store/selectors';
import { map, Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { environment } from 'apps/frontend/src/environments/environment.dev';
import { UserProfile } from '@cherrypicker/auth-fe';

@Component({
  selector: 'cp-landing-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {

  private readonly store: Store<AppState> = inject(Store);

  protected readonly isUserAuthenticated$: Observable<boolean> = this.store.select(userProfileSelector).pipe(map(profile => profile !== null));

  protected readonly userProfile$: Observable<UserProfile> = this.store.select(userProfileSelector) as Observable<UserProfile>

  get ghAuthorizeEndpoint() {
    return `https://github.com/login/oauth/authorize?client_id=${environment.clientId}&redirect_uri=${environment.hostAddress}/github/authorize/callback&scope=repo`
  }
}
