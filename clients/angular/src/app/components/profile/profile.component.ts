import { Component, type OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {  Router, RouterModule } from "@angular/router";
import  { UserService } from "../../services/user.service";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      this.router.navigate(["/login"]);
      return;
    }
    this.user = JSON.parse(userStr);
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (userData: any) => {
        console.log("[v0] User profile loaded:", userData);
        this.user = userData;
        localStorage.setItem("user", JSON.stringify(userData));
      },
      error: (error: any) => {
        console.error("Error loading profile:", error);
      },
    });
  }

  removeFromWatchlist(movieId: string): void {
    const userId = this.user._id || this.user.id;
    this.userService.removeFromWatchlist(userId, movieId).subscribe({
      next: (updatedUser: any) => {
        this.user = updatedUser;
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
