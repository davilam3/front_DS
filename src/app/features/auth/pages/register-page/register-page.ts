import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.html'
})
export class RegisterPage {

  name = '';
  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  successMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  register() {

    if (!this.name || !this.email || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.register(this.name, this.email, this.password)
      .subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Usuario registrado correctamente';

          // ⏳ Pequeña pausa visual y redirección
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          this.loading = false;

          if (err.status === 409) {
            this.errorMessage = 'El correo ya está registrado';
          } else {
            this.errorMessage = 'Error al registrar usuario';
          }
        }
      });
  }


}
