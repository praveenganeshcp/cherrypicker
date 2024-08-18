import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfile } from "../types";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) {}

    private get apiUrl(): string {
        return `http://localhost:3000/api`
    }

    fetchProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.apiUrl}/auth/profile`, {
            withCredentials: true
        })
    }

    authorizeGithubAccount(exchangeCode: string): Observable<UserProfile> {
        return this.http.post<UserProfile>(`${this.apiUrl}/auth/authorize`, {
            exchangeCode
        }, {withCredentials: true});
    }
}