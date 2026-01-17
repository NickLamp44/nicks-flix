import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { FetchApiDataService } from "../../services/fetch-api-data.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  userData = { username: "", password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  loginUser(): void {
    console.log("[v0] Attempting login with username:", this.userData.username);
    this.fetchApiData.loginUser(this.userData).subscribe({
      next: (result: any) => {
        console.log("[v0] Login successful, response:", result);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        this.router.navigate(["/movies"]);
      },
      error: (error: any) => {
        console.error("[v0] Login error:", error);
        alert("Login failed. Please check your credentials.");
      },
    });
  }
}
