import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CherrypickRequestsManagerService, CommitInfoComponent, GitCommit, PreviewRequestComponent, VCSRepository } from '@cherrypicker/request-manager-fe';
import { MatButtonModule } from "@angular/material/button";
import { MatStepperModule } from "@angular/material/stepper";
import { MatInputModule } from "@angular/material/input";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { switchMap } from 'rxjs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'cp-create-cherrypick-request',
  standalone: true,
  imports: [CommonModule, MatButtonModule,MatFormFieldModule, PreviewRequestComponent, MatSelectModule, MatCheckboxModule, MatStepperModule, MatInputModule, ReactiveFormsModule, MatRadioModule, CommitInfoComponent],
  templateUrl: './create-cherrypick-request.component.html',
  styleUrl: './create-cherrypick-request.component.scss',
})
export class CreateCherrypickRequestComponent implements OnInit {

  protected allRepos: VCSRepository[] = [];

  protected allCommits: GitCommit[] = []

  requestManagerService = inject(CherrypickRequestsManagerService);

  router = inject(Router);

  formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.requestManagerService.fetchVCSRepository().subscribe((repos) => {
      this.allRepos = repos;
    })
    this.cherrypickRequestForm.controls['repo'].valueChanges.pipe(
      switchMap((repo) => this.requestManagerService.fetchCommits(repo?.name ?? ''))
    ).subscribe(commits => {
      this.allCommits = commits;
    })
  }

  protected readonly cherrypickRequestForm = this.formBuilder.group({
    repo: this.formBuilder.control({name: '', id: null}, [Validators.required]),
    targetBranch: this.formBuilder.control('', [Validators.required]),
    commits: this.formBuilder.control([] as GitCommit[], [Validators.required]),
    title: this.formBuilder.control('', [Validators.required])
  })

  get reviewData() {
    const formValue = this.cherrypickRequestForm.value;
    return {
      repoName: formValue.repo?.name ?? '',
      targetBranch: formValue.targetBranch ?? '',
      title: formValue.title ?? '',
      commits: formValue.commits ?? []
    }
  }

  get selectedCommits(): GitCommit[] {
    return this.cherrypickRequestForm.controls['commits'].value ?? [];
  }

  handleCreateRequest() {
    const formValue = this.cherrypickRequestForm.value;
    this.requestManagerService.createRequest({
      title: formValue.title ?? '',
      targetBranch: formValue.targetBranch ?? '',
      commits: formValue.commits ?? [],
      repoId: formValue.repo?.id ?? ''
    }).subscribe(response => {
      this.router.navigate(['app', 'cherrypick-requests', response.id])
    })
  }
 
}
