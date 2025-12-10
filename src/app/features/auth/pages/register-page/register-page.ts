import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/firebase/auth';
import { of } from 'rxjs';
import { formUtils } from '../../../../core/services/Utils/formUtils';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;

  // Signal para disparar el registro
  private registerTrigger = signal<{ email: string; password: string } | null>(null);

  // rxResource para manejar el proceso de registro (Angular 20+)
  registerResource = rxResource({
    params: () => this.registerTrigger(),
    stream: ({ params }) => {
      if (!params) return of(null);
      return this.authService.register(params.email, params.password);
    }
  });

  formUtils = formUtils;

  constructor() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });

    // Effect para navegar cuando el registro sea exitoso
    effect(() => {
      if (this.registerResource.hasValue() && this.registerResource.value()) {
        console.log('Registro exitoso, navegando a /simpsons');
        this.router.navigate(['/simpsons']);
      }
    });
  }

  registerWithGoogle() {
  this.authService.loginWithGoogle().subscribe({
    next: (res) => {
      console.log('Usuario registrado con Google', res.user);
      this.router.navigate(['/inicio']); // Redirige al inicio
    },
    error: (err) => {
      console.error('Error al registrarse con Google', err);
    }
  });
}


  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // this.loading.set(true);
    // this.errorMessage.set(null);

    const { email, password } = this.registerForm.value;

    

    // this.authService.register(email, password).subscribe({
    //   next: () => {
    //     this.loading.set(false);
    //     // Cambio: Navegar a /home en lugar de /simpsons
    //     this.router.navigate(['/home']);
    //   },
    //   error: (error) => {
    //     this.loading.set(false);
    //     this.errorMessage.set(this.getErrorMessage(error.code));
    //   }
    // });

    // Disparar el registro actualizando el signal
    this.registerTrigger.set({ email, password });
  }

  

  // Computed signal para el estado de carga
  loading = this.registerResource.isLoading;

  // Computed signal para el mensaje de error
  errorMessage = () => {
    const error = this.registerResource.error();
    if (!error) return '';

    const code = (error as any).code || '';
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Este correo ya está registrado',
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña es muy débil'
    };
    return errorMessages[code] || 'Error al registrar usuario';
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

}
