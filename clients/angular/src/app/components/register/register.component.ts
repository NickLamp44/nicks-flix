import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { FetchApiDataService } from "../../services/fetch-api-data.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  userData = { username: "", password: "", Email: "", Birthday: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  registerUser(): void {
    console.log("Attempting registration with:", {
      username: this.userData.username,
      Email: this.userData.Email,
      Birthday: this.userData.Birthday,
    });

    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result: any) => {
        console.log("Registration successful:", result);
        alert("Registration successful! Please log in.");
        this.router.navigate(["/login"]);
      },
      error: (error: any) => {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      },
    });
  }
}
