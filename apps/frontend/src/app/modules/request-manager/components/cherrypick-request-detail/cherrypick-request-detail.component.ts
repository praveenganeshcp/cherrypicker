import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CherrypickRequest, CherrypickRequestsManagerService, GitCommit, PreviewRequestComponent } from '@cherrypicker/request-manager-fe';

@Component({
  selector: 'cp-cherrypick-request-detail',
  standalone: true,
  imports: [PreviewRequestComponent, NgIf],
  templateUrl: './cherrypick-request-detail.component.html',
  styleUrl: './cherrypick-request-detail.component.scss',
})
export class CherrypickRequestDetailComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute); 

  requestManagerService = inject(CherrypickRequestsManagerService);

  requestDetail: CherrypickRequest | null = null;

  ngOnInit(): void {
      this.fetchRequestDetails();
  }

  fetchRequestDetails() {
    this.requestManagerService.fetchRequestDetail(this.activatedRoute.snapshot.params['requestId']).subscribe(details => {
      this.requestDetail = details;
    })
  }

  get commits() {
    return this.requestDetail ? this.requestDetail?.commits.map(commit => {
      return <GitCommit>{
        htmlUrl: commit.url,
        sha: commit.sha,
        timestamp: commit.commitedOn,
        message: commit.message
      }
    }) : []
  }

  get repoName() {
    return this.requestDetail?.repo?.[0].name ?? ''
  }
}
