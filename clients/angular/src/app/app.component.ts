import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <header>
      <h1>Nick’s Flix</h1>
    </header>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
