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

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  esAdmin(): boolean {
    return this.authService.hasRole('ROLE_ADMIN');
  }

  esProgramador(): boolean {
    return this.authService.hasRole('ROLE_PROGRAMMER');
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
    const roles = this.authService.getUserRoles();

    if (roles.includes('ROLE_ADMIN')) return 'admin';
    if (roles.includes('ROLE_PROGRAMMER')) return 'programador';
    return 'user';
  }

  goHome(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  scrollTo(sectionId: string) {

    // Si NO estamos en el home, navegar primero
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          this.scroll(sectionId);
        }, 100);
      });
    } else {
      this.scroll(sectionId);
    }
  }

  private scroll(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }


}
