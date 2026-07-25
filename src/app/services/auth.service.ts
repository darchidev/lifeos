import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

export interface AuthUser {
  email: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly user = signal<AuthUser | null>(this.loadUser());
  readonly token = signal<string | null>(this.loadToken());

  get isLoggedIn(): boolean {
    return !!this.token() && !!this.user();
  }

  private loadUser(): AuthUser | null {
    if (!this.isBrowser) return null;
    const raw = localStorage.getItem('lifeos-user');
    return raw ? JSON.parse(raw) : null;
  }

  private loadToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('lifeos-token');
  }

  async login(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error || 'Login fallito' };
      this.setSession(data.token, data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Errore di connessione' };
    }
  }

  async register(email: string, password: string, name: string): Promise<{ ok: boolean; error?: string }> {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error || 'Registrazione fallita' };
      this.setSession(data.token, data.user);
      return { ok: true };
    } catch {
      return { ok: false, error: 'Errore di connessione' };
    }
  }

  logout(): void {
    this.token.set(null);
    this.user.set(null);
    if (this.isBrowser) {
      localStorage.removeItem('lifeos-token');
      localStorage.removeItem('lifeos-user');
    }
    this.router.navigate(['/login']);
  }

  private setSession(token: string, user: AuthUser): void {
    this.token.set(token);
    this.user.set(user);
    if (this.isBrowser) {
      localStorage.setItem('lifeos-token', token);
      localStorage.setItem('lifeos-user', JSON.stringify(user));
    }
  }
}
