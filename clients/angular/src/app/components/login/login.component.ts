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
    console.log("Attempting login with username:", this.userData.username);

    // Show loading message for backend wake-up
    const loginButton = document.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    const originalText = loginButton?.textContent;
    if (loginButton) {
      loginButton.disabled = true;
      loginButton.textContent = "Connecting to server...";
    }

    this.fetchApiData.loginUser(this.userData).subscribe({
      next: (result: any) => {
        console.log("Login successful, response:", result);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        this.router.navigate(["/movies"]);
      },
      error: (error: any) => {
        console.error("Login error:", error);

        // Re-enable button
        if (loginButton) {
          loginButton.disabled = false;
          loginButton.textContent = originalText;
        }

        if (error.message.includes("Failed to fetch") || error.status === 0) {
          alert(
            "Unable to connect to server. The server may be waking up (this can take 30-60 seconds on free hosting). Please try again in a moment."
          );
        } else {
          alert("Login failed. Please check your credentials.");
        }
      },
    });
  }
}
