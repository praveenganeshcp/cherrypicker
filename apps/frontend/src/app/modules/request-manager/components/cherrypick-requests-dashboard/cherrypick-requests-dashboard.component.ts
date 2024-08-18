import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.state';
import { Observable } from 'rxjs';
import { CherrypickRequest, CherrypickRequestsGridComponent } from '@cherrypicker/request-manager-fe';
import { fetchAllRequestsAction } from '../../store/actions';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cp-cherrypick-requests-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CherrypickRequestsGridComponent, MatButtonModule],
  templateUrl: './cherrypick-requests-dashboard.component.html',
  styleUrl: './cherrypick-requests-dashboard.component.scss',
})
export class CherrypickRequestsDashboardComponent implements OnInit {

  readonly store: Store<AppState> = inject(Store);

  protected allRequests$: Observable<CherrypickRequest[]> = this.store.select(state => state.dashboard.data ?? []);

  protected loading$: Observable<boolean> = this.store.select(state => state.dashboard.isLoading);

  ngOnInit(): void {
      this.store.dispatch(fetchAllRequestsAction());
  }
}
