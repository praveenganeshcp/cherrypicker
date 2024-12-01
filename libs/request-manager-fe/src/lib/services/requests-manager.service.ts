import { HttpClient } from "@angular/common/http";
import {
  CherrypickRequest,
  CreateRequestPayload,
  GitCommit,
  VCSRepository,
} from "../types";
import { Inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CherrypickRequestsManagerService {
  constructor(
    private readonly http: HttpClient,
    @Inject("API_URL")
    private apiUrl: string
  ) {}

  fetchAllRequests() {
    return this.http.get<CherrypickRequest[]>(
      `${this.apiUrl}/requests-manager/requests`,
      {
        withCredentials: true,
      }
    );
  }

  fetchVCSRepository() {
    return this.http.get<VCSRepository[]>(
      `${this.apiUrl}/requests-manager/vcs-repo`,
      {
        withCredentials: true,
      }
    );
  }

  fetchCommits(repoName: string) {
    return this.http.get<GitCommit[]>(
      `${this.apiUrl}/requests-manager/repo/${repoName}/commits`,
      {
        withCredentials: true,
      }
    );
  }

  createRequest(payload: CreateRequestPayload): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(
      `${this.apiUrl}/requests-manager/requests`,
      payload,
      { withCredentials: true }
    );
  }

  fetchRequestDetail(id: string): Observable<CherrypickRequest> {
    return this.http
      .get<CherrypickRequest>(
        `${this.apiUrl}/requests-manager/requests/${id}`,
        {
          withCredentials: true,
        }
      )
      .pipe(map((details) => details));
  }

  approveRequest(id: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/requests-manager/requests/${id}/approve`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
