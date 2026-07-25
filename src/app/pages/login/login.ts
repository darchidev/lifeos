import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="login-page">
      <div class="login-card">
        <div class="login-logo">🧠</div>
        <h1>LifeOS</h1>
        <p class="login-subtitle">Il tuo personal dashboard</p>

        <div class="login-tabs">
          <button [class.active]="!isRegister" (click)="isRegister.set(false)">Accedi</button>
          <button [class.active]="isRegister" (click)="isRegister.set(true)">Registrati</button>
        </div>

        <form (ngSubmit)="submit()" class="login-form">
          @if (isRegister()) {
            <input
              [(ngModel)]="name" name="name" placeholder="Nome"
              required autocomplete="name"
            />
          }
          <input
            [(ngModel)]="email" name="email" type="email" placeholder="Email"
            required autocomplete="email"
          />
          <input
            [(ngModel)]="password" name="password" type="password" placeholder="Password"
            required autocomplete="current-password"
          />

          @if (error()) {
            <div class="login-error">{{ error() }}</div>
          }

          <button type="submit" class="login-btn" [disabled]="loading()">
            {{ loading() ? '⏳' : isRegister() ? 'Registrati' : 'Accedi' }}
          </button>
        </form>

        @if (!isRegister() && false) {
          <p class="login-hint">Prima volta? <a (click)="isRegister.set(true)">Crea un account</a></p>
        }
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      background: var(--background); padding: 1rem;
    }
    .login-card {
      background: var(--surface); border-radius: var(--radius-lg);
      padding: 2.5rem 2rem; width: 100%; max-width: 22rem;
      box-shadow: var(--shadow-lg); text-align: center;
    }
    .login-logo { font-size: 3rem; margin-bottom: 0.5rem; }
    .login-card h1 { font-size: 1.75rem; font-weight: 800; margin: 0; }
    .login-subtitle { color: var(--text-tertiary); margin: 0.25rem 0 1.5rem; font-size: 0.9rem; }
    .login-tabs {
      display: flex; background: var(--background); border-radius: var(--radius-sm);
      padding: 3px; margin-bottom: 1.5rem;
    }
    .login-tabs button {
      flex: 1; padding: 0.5rem; border: none; border-radius: calc(var(--radius-sm) - 3px);
      background: transparent; font-weight: 600; font-size: 0.85rem;
      cursor: pointer; color: var(--text-secondary); font-family: inherit;
      transition: all 0.15s;
    }
    .login-tabs button.active {
      background: var(--surface); color: var(--text-primary);
      box-shadow: var(--shadow-sm);
    }
    .login-form { display: flex; flex-direction: column; gap: 0.75rem; }
    .login-form input {
      padding: 0.75rem 1rem; border: 1.5px solid var(--border);
      border-radius: var(--radius-sm); font-size: 0.95rem;
      background: var(--surface); color: var(--text-primary);
      outline: none; font-family: inherit;
      transition: border-color 0.15s;
    }
    .login-form input:focus { border-color: var(--primary); }
    .login-error {
      background: #fee2e2; color: #991b1b; padding: 0.6rem 0.75rem;
      border-radius: var(--radius-sm); font-size: 0.85rem; text-align: left;
    }
    .dark .login-error { background: #7f1d1d; color: #fecaca; }
    .login-btn {
      padding: 0.75rem; border: none; border-radius: var(--radius-sm);
      background: var(--primary); color: white; font-weight: 700; font-size: 1rem;
      cursor: pointer; font-family: inherit; margin-top: 0.25rem;
      transition: filter 0.15s;
    }
    .login-btn:hover { filter: brightness(1.1); }
    .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .login-hint { margin-top: 1rem; font-size: 0.85rem; color: var(--text-tertiary); }
    .login-hint a { color: var(--primary); cursor: pointer; font-weight: 600; }
  `]
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isRegister = signal(false);
  readonly loading = signal(false);
  readonly error = signal('');

  email = '';
  password = '';
  name = '';

  async submit(): Promise<void> {
    if (!this.email || !this.password) return;
    if (this.isRegister() && !this.name) return;

    this.loading.set(true);
    this.error.set('');

    const result = this.isRegister()
      ? await this.auth.register(this.email, this.password, this.name)
      : await this.auth.login(this.email, this.password);

    this.loading.set(false);

    if (result.ok) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error.set(result.error || 'Errore sconosciuto');
    }
  }
}
