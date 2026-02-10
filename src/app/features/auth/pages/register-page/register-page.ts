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

    this.authService.register(this.name, this.email, this.password)
      .subscribe({
        next: () => {

          // 🔥 LOGIN AUTOMÁTICO
          this.authService.login(this.email, this.password)
            .subscribe(() => {
              this.router.navigate(['/']);
            });

        },
        error: () => {
          this.errorMessage = 'Error al registrar usuario';
          this.loading = false;
        }
      });
  }

}
