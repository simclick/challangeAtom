import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserSession = { email: string };

const LS_KEY = 'sessionUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<UserSession | null>(this.readFromLS());
  user$ = this._user$.asObservable();

  private readFromLS(): UserSession | null {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) as UserSession : null;
    } catch { return null; }
  }

  isLoggedIn(): boolean {
    return !!this._user$.value;
  }

  getEmail(): string | null {
    return this._user$.value?.email ?? null;
  }

  login(email: string) {
    const user = { email: email.trim().toLowerCase() };
    localStorage.setItem(LS_KEY, JSON.stringify(user));
    this._user$.next(user);
  }

  logout() {
    localStorage.removeItem(LS_KEY);
    this._user$.next(null);
  }
}
