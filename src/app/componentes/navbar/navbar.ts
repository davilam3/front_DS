import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html'
})
export class Navbar {

  private authService = inject(AuthService);
  private router = inject(Router);

  // 🔐 AUTENTICACIÓN
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

 esAdmin(): boolean {
  return this.authService.getUserRole().includes('ROLE_ADMIN');
}

esProgramador(): boolean {
  return this.authService.getUserRole().includes('ROLE_PROGRAMMER');
}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // 👤 DECODIFICAR USUARIO DESDE JWT
  currentUser(): any {
    const token = this.authService.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }

 userRole(): string {
  const roles = this.authService.getUserRole();

  if (roles.includes('ROLE_ADMIN')) return 'admin';
  if (roles.includes('ROLE_PROGRAMMER')) return 'programador';
  return 'user';
}

  goHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  scrollToPerfiles(event: Event): void {
    event.preventDefault();
    document.getElementById('perfiles')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToProjects(event: Event): void {
    event.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }


}
