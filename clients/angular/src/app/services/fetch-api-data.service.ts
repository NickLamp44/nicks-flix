import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error("[v0] Client-side error:", error.error.message);
    } else {
      console.error(`[v0] Server error ${error.status}:`, error.error);
    }
    return throwError(
      () => new Error("Something went wrong. Please try again later.")
    );
  }

  // Extract response data
  private extractResponseData(res: any): any {
    return res || {};
  }

  // Get authorization headers
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // USER REGISTRATION
  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // USER LOGIN
  loginUser(userData: any): Observable<any> {
    console.log("[v0] Posting to login endpoint:", `${apiUrl}/login`);
    return this.http.post(`${apiUrl}/login`, userData).pipe(
      tap((response: any) => console.log("[v0] Login response:", response)),
      catchError(this.handleError)
    );
  }

  // GET ALL MOVIES
  getAllMovies(): Observable<any> {
    return this.http
      .get(`${apiUrl}/movies`, { headers: this.getAuthHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // GET USER PROFILE
  getUserProfile(userId: string): Observable<any> {
    return this.http
      .get(`${apiUrl}/users/${userId}`, { headers: this.getAuthHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // UPDATE USER
  updateUser(userId: string, userData: any): Observable<any> {
    return this.http
      .put(`${apiUrl}/users/${userId}`, userData, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // ADD TO WATCHLIST
  addToWatchlist(userId: string, movieId: string): Observable<any> {
    return this.http
      .post(
        `${apiUrl}/users/${userId}/watchlist/${movieId}`,
        {},
        { headers: this.getAuthHeaders() }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // REMOVE FROM WATCHLIST
  removeFromWatchlist(userId: string, movieId: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}/users/${userId}/watchlist/${movieId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // DELETE USER
  deleteUser(userId: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}/users/${userId}`, { headers: this.getAuthHeaders() })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
}
