import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.html'
})
export class LoginPage {

  email: string = '';
  password: string = '';
  loading = false;
  errorMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  login() {

    if (!this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE:', res);
        this.loading = false;
      },
      error: (err) => {
        console.error('LOGIN ERROR:', err);
        this.errorMessage = 'Credenciales incorrectas';
        this.loading = false;
      }
    });

  }
}
