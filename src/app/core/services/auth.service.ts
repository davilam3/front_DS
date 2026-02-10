import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  register(name: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      name,
      email,
      password
    });
  }
  private http = inject(HttpClient);
  private apiUrl = 'https://dc-plataform.onrender.com/api';

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
        })
      );
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

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));

    // roles viene como string: "ROLE_ADMIN,ROLE_USER"
    if (payload.roles) {
      return payload.roles.split(',')[0];
    }

    return null;
  }


  getCurrentUser(): any | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }


}
