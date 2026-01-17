import { Component, type OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MovieService } from "../../services/movie.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-movie-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  user: any = null;
  userWatchlist: Set<string> = new Set();

  constructor(
    private movieService: MovieService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      this.router.navigate(["/login"]);
      return;
    }
    this.user = JSON.parse(userStr);
    this.loadUserWatchlist();
    this.loadMovies();
  }

  loadUserWatchlist(): void {
    this.userService.getUserProfile().subscribe({
      next: (userData: any) => {
        this.user = userData;
        this.userWatchlist = new Set(
          userData.Watchlist?.map((m: any) => m._id || m) || []
        );
        localStorage.setItem("user", JSON.stringify(userData));
      },
      error: (error: any) => {
        console.error("Error loading user watchlist:", error);
      },
    });
  }

  loadMovies(): void {
    this.movieService.getAllMovies().subscribe({
      next: (movies: any) => {
        this.movies = movies;
      },
      error: (error: any) => {
        console.error("Error loading movies:", error);
      },
    });
  }

  isInWatchlist(movieId: string): boolean {
    return this.userWatchlist.has(movieId);
  }

  addToWatchlist(movieId: string): void {
    const userId = this.user._id || this.user.id;
    this.userService.addToWatchlist(userId, movieId).subscribe({
      next: (updatedUser: any) => {
        this.user = updatedUser;
        this.userWatchlist.add(movieId);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Movie added to watchlist!");
      },
      error: (error: any) => {
        console.error("Error adding to watchlist:", error);
        alert("Failed to add movie to watchlist");
      },
    });
  }

  removeFromWatchlist(movieId: string): void {
    const userId = this.user._id || this.user.id;
    this.userService.removeFromWatchlist(userId, movieId).subscribe({
      next: (updatedUser: any) => {
        this.user = updatedUser;
        this.userWatchlist.delete(movieId);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Movie removed from watchlist!");
      },
      error: (error: any) => {
        console.error("Error removing from watchlist:", error);
        alert("Failed to remove movie from watchlist");
      },
    });
  }

  logout(): void {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
