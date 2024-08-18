import { Component, Input } from '@angular/core';
import { CherrypickRequest } from '../../types';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';

interface CherrypickRequestVM extends CherrypickRequest {
  repoName: string;
}

@Component({
  selector: 'rm-cherrypick-requests-grid',
  standalone: true,
  imports: [MatTableModule, MatTooltipModule, DatePipe],
  templateUrl: './cherrypick-requests-grid.component.html',
  styleUrl: './cherrypick-requests-grid.component.scss',
})
export class CherrypickRequestsGridComponent {

  readonly COLUMNS: string[] = ['repository', 'title', 'commits', 'createdOn', 'status'];

  private _cherrypickRequests: CherrypickRequestVM[] = [];

  @Input() 
  set cherrypickRequests(data: CherrypickRequest[]) {
    this._cherrypickRequests = data.map(request => ({
      ...request,
      repoName: request.repo[0].name
    }))
  }

  get cherrypickRequests() {
    return this._cherrypickRequests;
  }

}
