import { Injectable } from "@angular/core";
import { FetchApiDataService } from "./fetch-api-data.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private fetchApiData: FetchApiDataService) {}

  getUser(username: string): Observable<any> {
    return this.fetchApiData.getUserProfile(username);
  }

  getUserProfile(): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const username = user.username || user.Username;
    return this.fetchApiData.getUserProfile(username);
  }

  updateUser(userData: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const username = user.username || user.Username;
    return this.fetchApiData.updateUser(username, userData);
  }

  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const username = user.username || user.Username;
    return this.fetchApiData.deleteUser(username);
  }

  addToWatchlist(userId: string, movieId: string): Observable<any> {
    return this.fetchApiData.addToWatchlist(userId, movieId);
  }

  removeFromWatchlist(userId: string, movieId: string): Observable<any> {
    return this.fetchApiData.removeFromWatchlist(userId, movieId);
  }
}
