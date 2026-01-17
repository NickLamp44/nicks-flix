import { Injectable } from "@angular/core";
import { FetchApiDataService } from "./fetch-api-data.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private fetchApiData: FetchApiDataService) {}

  getAllMovies(): Observable<any> {
    return this.fetchApiData.getAllMovies();
  }

  getMovies(): Observable<any> {
    return this.fetchApiData.getAllMovies();
  }

  addToWatchlist(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return this.fetchApiData.addToWatchlist(
      user.username || user.Username,
      movieId
    );
  }

  removeFromFavorites(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return this.fetchApiData.removeFromWatchlist(
      user.username || user.Username,
      movieId
    );
  }
}
