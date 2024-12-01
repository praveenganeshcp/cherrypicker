import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CherrypickRequestsManagerService, CherrypickRequest, GitCommit, PreviewRequestComponent } from '@cherrypicker/request-manager-fe';
import { MatButtonModule } from '@angular/material/button';
import { CherrypickStatus } from '@cherrypicker/request-manager-core';
import { MatSnackBarModule, MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'cp-approve-request',
  standalone: true,
  imports: [CommonModule, PreviewRequestComponent, MatButtonModule, MatSnackBarModule],
  templateUrl: './approve-request.component.html',
  styleUrl: './approve-request.component.scss',
})
export class ApproveRequestComponent {
  activatedRoute = inject(ActivatedRoute); 

  requestManagerService = inject(CherrypickRequestsManagerService);

  requestDetail: CherrypickRequest | null = null;

  toastService = inject(MatSnackBar)

  ngOnInit(): void {
      this.fetchRequestDetails()
  }

  fetchRequestDetails() {
    this.requestManagerService.fetchRequestDetail(this.activatedRoute.snapshot.params['requestId']).subscribe(details => {
      console.log(details);
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
    return this.requestDetail?.repository.name ?? ''
  }

  handleApproveRequest() {
    this.requestManagerService.approveRequest(this.activatedRoute.snapshot.params['requestId']).subscribe(_ => {
      this.toastService.open("Approved successfully", undefined, {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000
      })
      this.fetchRequestDetails()
    })
  }

  get showApproveButton() {
    return this.requestDetail ? this.requestDetail.status === CherrypickStatus.WaitingForApproval : false;
  }
}
