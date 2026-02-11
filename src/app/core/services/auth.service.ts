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
        const token =
          response.token ||
          response.accessToken ||
          response.jwt;

        if (!token) {
          throw new Error('Token no recibido del backend');
        }

        localStorage.setItem('token', token);
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

 getUserRoles(): string[] {
  const user = this.getCurrentUser();
  if (!user) return [];

  return user.roles || user.authorities || [];
}

hasRole(role: string): boolean {
  return this.getUserRoles().includes(role);
}


}
