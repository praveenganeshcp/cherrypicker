import { Component, Input } from "@angular/core";
import { NgFor, NgIf } from "@angular/common";
import { GitCommit } from "../../types";
import { CommitInfoComponent } from "../commit-info/commit-info.component";
import { CherrypickStatus } from "@cherrypicker/request-manager-core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "rm-preview-request",
  standalone: true,
  imports: [CommitInfoComponent, NgFor, NgIf, MatIconModule],
  templateUrl: "./preview-request.component.html",
  styleUrl: "./preview-request.component.scss",
})
export class PreviewRequestComponent {
  @Input() title: string = "";

  @Input() targetBranch: string = "";

  @Input() commits: GitCommit[] = [];

  @Input() repoName: string = "";

  @Input() status!: CherrypickStatus;
}
