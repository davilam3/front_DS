import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/auth';

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          if (response?.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }


  register(name: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      name,
      email,
      password
    });
  }


  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }

  getUserRole(): string[] {
    const user = this.getCurrentUser();
    if (!user) return [];

    // Caso 1: roles como array
    if (Array.isArray(user.roles)) {
      return user.roles;
    }

    // Caso 2: authorities como array (Spring Security estándar)
    if (Array.isArray(user.authorities)) {
      return user.authorities;
    }

    // Caso 3: roles como string
    if (typeof user.roles === 'string') {
      return user.roles.split(',');
    }

    return [];
  }

}
