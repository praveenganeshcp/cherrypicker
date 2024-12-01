import { Component, Input } from '@angular/core';
import { CherrypickRequest } from '../../types';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CherrypickRequestVM extends CherrypickRequest {
}

@Component({
  selector: 'rm-cherrypick-requests-grid',
  standalone: true,
  imports: [MatTableModule, MatTooltipModule, DatePipe, RouterModule],
  templateUrl: './cherrypick-requests-grid.component.html',
  styleUrl: './cherrypick-requests-grid.component.scss',
})
export class CherrypickRequestsGridComponent {

  readonly COLUMNS: string[] = ['repository', 'title', 'commits', 'createdOn', 'status', 'actions'];

  private _cherrypickRequests: CherrypickRequestVM[] = [];

  @Input() 
  set cherrypickRequests(data: CherrypickRequest[]) {
    this._cherrypickRequests = data;
  }

  get cherrypickRequests() {
    return this._cherrypickRequests;
  }

}
