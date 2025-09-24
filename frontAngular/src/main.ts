import { bootstrapApplication } from '@angular/platform-browser';

import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { appConfig } from './app/app.config';
import { MatButtonModule, MatFabAnchor } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MatToolbarModule ,MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary" class="app-toolbar">
      <button mat-icon-button aria-label="Inicio" routerLink="/">
       
      </button>
      <span class="brand">Atom Tasks</span>
      <span class="spacer"></span>
  
    </mat-toolbar>

    <main class="app-container">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
