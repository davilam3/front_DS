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
    return this.authService.getUserRole() === 'ROLE_ADMIN';
  }

  esProgramador(): boolean {
    return this.authService.getUserRole() === 'ROLE_PROGRAMMER';
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

  // 🎭 ROL LIMPIO PARA EL SWITCH DEL HTML
  userRole(): string {
    const role = this.authService.getUserRole();

    if (role === 'ROLE_ADMIN') return 'admin';
    if (role === 'ROLE_PROGRAMMER') return 'programador';
    return 'user';
  }

  // 🏠 NAVEGACIÓN HOME
  goHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  // 🔽 SCROLL A SECCIONES
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
