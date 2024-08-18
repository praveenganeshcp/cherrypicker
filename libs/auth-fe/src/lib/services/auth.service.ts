import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserProfile } from "../types";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(
        private http: HttpClient,
        @Inject('API_URL') 
        private apiUrl: string
    ) {}

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