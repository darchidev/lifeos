import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';
import { MobileNav } from '../mobile-nav/mobile-nav';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Topbar, MobileNav],
  template: `
    <div class="app">
      <a href="#main-content" class="skip-link">Salta al contenuto principale</a>
      <app-sidebar />
      <main id="main-content" class="content">
        <app-topbar />
        <router-outlet />
      </main>
      <app-mobile-nav />
    </div>
  `,
})
export class MainLayout {}
