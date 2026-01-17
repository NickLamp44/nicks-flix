import type { Routes } from "@angular/router"

export const routes: Routes = [
  { path: "", redirectTo: "/movies", pathMatch: "full" },
  {
    path: "login",
    loadComponent: () => import("./components/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "register",
    loadComponent: () => import("./components/register/register.component").then((m) => m.RegisterComponent),
  },
  {
    path: "movies",
    loadComponent: () => import("./components/movie-list/movie-list.component").then((m) => m.MovieListComponent),
  },
  {
    path: "profile",
    loadComponent: () => import("./components/profile/profile.component").then((m) => m.ProfileComponent),
  },
]
