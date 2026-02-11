FRONTEND/
├── .angular/
├── .vscode/
├── node_modules/
├── public/
│   └── index.html
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── back-to-top/
│   │   │   │   ├── back-to-top.html
│   │   │   │   └── back-to-top.ts
│   │   │   ├── footer/
│   │   │   │   ├── footer.css
│   │   │   │   ├── footer.html
│   │   │   │   └── footer.ts
│   │   │   └── navbar/
│   │   │       ├── navbar.html
│   │   │       └── navbar.ts
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── models/
│   │   │   │   ├── advisory.model.ts
│   │   │   │   ├── project.model.ts
│   │   │   │   └── user.model.ts
│   │   │   └── services/
│   │   │       ├── advisory.service.ts
│   │   │       ├── auth.service.ts
│   │   │       ├── project.service.ts
│   │   │       └── user.service.ts
│   │   ├── environments/
│   │   │   ├── environments.ts/
│   │   │   └── environments.prod.ts/
│   │   ├── features/
│   │   │   ├── admin-panel/
│   │   │   │   ├── admin-panel.html
│   │   │   │   └── admin-panel.ts
│   │   │   ├── auth/
│   │   │   │   ├── login-page/
│   │   │   │   │   ├── login-page.html
│   │   │   │   │   └── login-page.ts
│   │   │   │   └── register-page/
│   │   │   │       ├── register-page.html
│   │   │   │       └── register-page.ts
│   │   │   ├── dashboard/
│   │   │   │   └── perfil/
│   │   │   │       ├── perfil.html
│   │   │   │       └── perfil.ts
│   │   │   ├── homePage/
│   │   │   │   ├── homePage.css
│   │   │   │   ├── homePage.html
│   │   │   │   └── homePage.ts
│   │   │   └── programador-panel/
│   │   │       ├── programador-panel.html
│   │   │       └── programador-panel.ts
│   │   ├── environments/
│   │   │   ├── environment.prod.ts
│   │   │   └── environment.ts
│   │   ├── app.config.ts
│   │   ├── app.css
│   │   ├── app.html
│   │   ├── app.routes.ts
│   │   ├── app.spec.ts
│   │   └── app.ts
│   └── main.ts

### app.ts
```java
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./componentes/navbar/navbar";
import { BackToTop } from "./componentes/back-to-top/back-to-top";
import { filter } from 'rxjs';
import { Footer } from './componentes/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BackToTop, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-portafolio');

}

```

### app.routes.ts
```java
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/ auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./features/homePage/homePage')
        .then(m => m.HomePage)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page')
        .then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page')
        .then(m => m.RegisterPage)
  },

  {
    path: 'perfil/:id',
    loadComponent: () =>
      import('./features/dashboard/perfil/perfil')
        .then(m => m.Perfil),
  },

  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_ADMIN' },
    loadComponent: () =>
      import('./features/admin-panel/admin-panel')
        .then(m => m.AdminPanel)
  },

  {
    path: 'programmer',
    canActivate: [authGuard, roleGuard],
    data: { role: 'ROLE_PROGRAMMER' },
    loadComponent: () =>
      import('./features/programador-panel/programador-panel')
        .then(m => m.ProgramadorPanel)
  },

  {
    path: '**',
    redirectTo: ''
  }

];

```

### app.config.ts
```java
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};

```

### app.html
```java
<app-navbar></app-navbar>

<main class="pt-20">
  <router-outlet></router-outlet>
</main>

<app-footer></app-footer>
<app-back-to-top></app-back-to-top>
```

### app.spec.ts
```java
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, proyecto-portafolio');
  });
});
```

### main.ts
```java
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));

```

### environment.ts
```java
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};

```

### environment.prod.ts
```java
export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080'
};
  
```

### back-to-top.ts
```java
import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  imports: [],
  templateUrl: './back-to-top.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackToTop {
  // Signal que controla la visibilidad del botón
  isVisible = signal(false);

  // Detecta el desplazamiento vertical para mostrar el botón
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isVisible.set(window.scrollY > 300);
  }

  // Acción para volver al inicio suavemente
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 }

```

### back-to-top.html
```java
<!-- Back to Top FAB -->
@if (isVisible()) {
  <div class="fixed bottom-6 right-6 z-50">
    <button
      class="btn btn-circle btn-primary shadow-lg"
      (click)="scrollToTop()"
      aria-label="Volver arriba"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </div>
}
```

### footer.ts
```java
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer { }

```

### footer.html
```java
<section class="bg-cyan-950 text-gray-300 mt-20">

  <footer class="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

    <!-- LOGO + NOMBRE -->
    <div class="flex flex-col items-center md:items-start">
      <div class="flex items-center gap-3">
        <img src="assets/logo.jpg" class="w-16 h-16 object-contain rounded-full shadow-lg" alt="Logo" />
        <h2 class="text-2xl font-bold text-gray-100 tracking-wide">
          D&S | DevStudio
        </h2>
      </div>

      <p class="text-gray-400 mt-4 max-w-sm">
        Desarrollamos proyectos web modernos, aprendiendo y creando soluciones con
        pasión por la tecnología.


    </div>

    <!-- CONTACTO DIANA -->
    <div class="text-center md:text-left">
      <h3 class="text-xl font-semibold text-gray-100 mb-3">Contacto - Diana Avila</h3>

      <ul class="flex items-center gap-5">

        <!-- Ver Perfil -->
        <li>
          <a routerLink="/diana" class="text-gray-300 hover:text-white text-sm underline underline-offset-4">
            Ver Perfil
          </a>
        </li>

        <!-- Instagram -->
        <li>
          <a href="https://www.instagram.com/d_avila_m/" target="_blank" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20"
              class="hover:scale-110 transition">
              <path fill="#f0f4f9"
                d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h14c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2M9.984 15.523a5.54 5.54 0 0 0 5.538-5.539c0-.338-.043-.664-.103-.984H17v7.216a.69.69 0 0 1-.693.69H3.693a.69.69 0 0 1-.693-.69V9h1.549c-.061.32-.104.646-.104.984a5.54 5.54 0 0 0 5.539 5.539M6.523 9.984a3.461 3.461 0 1 1 6.922 0a3.461 3.461 0 0 1-6.922 0M16.307 6h-1.615A.694.694 0 0 1 14 5.308V3.691c0-.382.31-.691.691-.691h1.615c.384 0 .694.309.694.691v1.616c0 .381-.31.693-.693.693" />
            </svg>
          </a>
        </li>

        <!-- Facebook  -->
        <li>
          <a href="https://www.facebook.com/share/186HKpJ5JQ/?mibextid=wwXIfr" target="_blank" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20"
              class="hover:scale-110 transition">
              <path fill="#f0f4f9" d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h7v-7H8V9.525h2v-2.05c0-2.164 1.212-3.684 3.766-3.684l1.803.002v2.605h-1.197c-.994 0-1.372.746-1.372 
           1.438v1.69h2.568L15 12h-2v7h4c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2" />
            </svg>
          </a>
        </li>

        <!-- GitHub -->
        <li>
          <a href="https://github.com/davilam3" target="_blank" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20"
              class="hover:scale-110 transition">
              <path fill="#f0f4f9"
                d="M10.015 9.949h-.03c-1.191 0-2.24-.303-2.861.268a1.57 1.57 0 0 0-.527 1.197c0 1.852 1.483 2.08 3.389 2.08h.029c1.905 0 3.389-.229 3.389-2.08c0-.443-.156-.856-.527-1.197c-.622-.571-1.671-.268-2.862-.268M8.393 12.48c-.363 0-.656-.408-.656-.91s.293-.908.656-.908s.657.406.657.908c.001.502-.293.91-.657.91m3.213 0c-.363 0-.657-.408-.657-.91s.294-.908.657-.908c.362 0 .656.406.656.908c.001.502-.293.91-.656.91M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.876 13.539c-.172 0-.514 0-.876.002c-.362-.002-.704-.002-.876-.002c-.76 0-3.772-.059-3.772-3.689c0-.834.286-1.445.755-1.955c-.074-.184-.078-1.232.32-2.236c0 0 .916.1 2.301 1.051c.289-.081.781-.122 1.272-.122s.982.041 1.273.121c1.385-.951 2.301-1.051 2.301-1.051c.398 1.004.395 2.053.32 2.236c.469.51.755 1.121.755 1.955c-.001 3.632-3.013 3.69-3.773 3.69" />
            </svg>
          </a>
        </li>

      </ul>
    </div>


    <!-- CONTACTO SEBASTIÁN -->
    <div class="text-center md:text-left">
      <h3 class="text-xl font-semibold text-gray-100 mb-3">Contacto - Sebastián Cabrera</h3>

      <ul class="flex items-center gap-5">

        <!-- Ver Perfil -->
        <li>
          <a routerLink="/sebas" class="text-gray-300 hover:text-white text-sm underline underline-offset-4">
            Ver Perfil
          </a>
        </li>

        <!-- Instagram -->
        <li>
          <a href="https://www.instagram.com/tato_cabrera_jr/" target="_blank" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20"
              class="hover:scale-110 transition">
              <path fill="#f0f4f9"
                d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h14c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2M9.984 15.523a5.54 5.54 0 0 0 5.538-5.539c0-.338-.043-.664-.103-.984H17v7.216a.69.69 0 0 1-.693.69H3.693a.69.69 0 0 1-.693-.69V9h1.549c-.061.32-.104.646-.104.984a5.54 5.54 0 0 0 5.539 5.539M6.523 9.984a3.461 3.461 0 1 1 6.922 0a3.461 3.461 0 0 1-6.922 0M16.307 6h-1.615A.694.694 0 0 1 14 5.308V3.691c0-.382.31-.691.691-.691h1.615c.384 0 .694.309.694.691v1.616c0 .381-.31.693-.693.693" />
            </svg>
          </a>
        </li>

        <!-- Facebook -->
        <li>
          <a href="https://www.facebook.com/share/17sqGjzGdL/?mibextid=wwXIfr" target="_blank" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20"
              class="hover:scale-110 transition">
              <path fill="#f0f4f9" d="M17 1H3c-1.1 0-2 .9-2 2v14c0 1.101.9 2 2 2h7v-7H8V9.525h2v-2.05c0-2.164 1.212-3.684 3.766-3.684l1.803.002v2.605h-1.197c-.994 0-1.372.746-1.372 
           1.438v1.69h2.568L15 12h-2v7h4c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2" />
            </svg>
          </a>
        </li>

        <!-- GitHub -->
        <li>
          <a href="https://github.com/Ccabreram1" target="_blank" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 20 20"
              class="hover:scale-110 transition">
              <path fill="#f0f4f9"
                d="M10.015 9.949h-.03c-1.191 0-2.24-.303-2.861.268a1.57 1.57 0 0 0-.527 1.197c0 1.852 1.483 2.08 3.389 2.08h.029c1.905 0 3.389-.229 3.389-2.08c0-.443-.156-.856-.527-1.197c-.622-.571-1.671-.268-2.862-.268M8.393 12.48c-.363 0-.656-.408-.656-.91s.293-.908.656-.908s.657.406.657.908c.001.502-.293.91-.657.91m3.213 0c-.363 0-.657-.408-.657-.91s.294-.908.657-.908c.362 0 .656.406.656.908c.001.502-.293.91-.656.91M10 .4C4.698.4.4 4.698.4 10s4.298 9.6 9.6 9.6s9.6-4.298 9.6-9.6S15.302.4 10 .4m.876 13.539c-.172 0-.514 0-.876.002c-.362-.002-.704-.002-.876-.002c-.76 0-3.772-.059-3.772-3.689c0-.834.286-1.445.755-1.955c-.074-.184-.078-1.232.32-2.236c0 0 .916.1 2.301 1.051c.289-.081.781-.122 1.272-.122s.982.041 1.273.121c1.385-.951 2.301-1.051 2.301-1.051c.398 1.004.395 2.053.32 2.236c.469.51.755 1.121.755 1.955c-.001 3.632-3.013 3.69-3.773 3.69" />
            </svg>
          </a>
        </li>

      </ul>
    </div>


  </footer>

  <!-- LINEA FINAL -->
  <div class="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
    © 2025 D&S DevStudio — Todos los derechos reservados.
  </div>

</section>

```
### footer.css
```java
:host {
  display: block;
}

```

### navbar.ts
```java
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

```
### navbar.html
```java
<!-- ============================== -->
<!-- SECCIÓN NAVBAR -->
<!-- ============================== -->

<section class="w-full bg-cyan-900 shadow-md fixed top-0 left-0 z-50">

  <div class="navbar px-8 max-w-6xl mx-auto w-full text-white flex justify-between items-center h-20 md:h-20">

    <!-- LOGO + NOMBRE -->
    <div class="flex items-center gap-5">
      <img src="assets/logo.jpg" alt="logo" class="h-12 w-12 rounded-full border border-white shadow">
      <span class="font-Lora text-xl tracking-wide font-bold text-white">
        D&S | DevStudio
      </span>
    </div>

    <!-- LINKS CENTRALES -->
    <div class="hidden md:flex gap-8 text-white text-[15px]">
      <a href="#" (click)="goHome($event)"
        class="relative after:block after:h-0.5 after:w-0 after:bg-cyan-950 after:transition-all after:duration-300 hover:after:w-full">
        Inicio
      </a>
      <a href="#" (click)="scrollToPerfiles($event)"
        class="relative after:block after:h-0.5 after:w-0 after:bg-cyan-950 after:transition-all after:duration-300 hover:after:w-full">
        Equipo
      </a>
      <a href="#" (click)="scrollToProjects($event)"
        class="relative after:block after:h-0.5 after:w-0 after:bg-cyan-950 after:transition-all after:duration-300 hover:after:w-full">
        Proyectos
      </a>
      <a routerLink="/contacto"
        class="relative after:block after:h-0.5 after:w-0 after:bg-cyan-950 after:transition-all after:duration-300 hover:after:w-full">
        Contacto
      </a>
    </div>

    <!-- BOTONES Y OPCIONES DE USUARIO -->
    <div class="flex items-center gap-4">

      <!-- (Agendar Asesoría eliminado) El contacto ya está disponible en 'Contacto' -->

      <!-- Opciones según rol -->
      @if (isAuthenticated()) {
      @if (esAdmin()) {
      <a routerLink="/admin" class="font-bold text-yellow-300 hover:text-white transition">
        ⚙️ Panel Admin
      </a>
      }
      @else if (esProgramador()) {
      <a routerLink="/programmer" class="font-bold text-green-300 hover:text-white transition">
        📁 Mi Portafolio
      </a>
      <a routerLink="/mis-asesorias" class="font-bold text-blue-300 hover:text-white transition">
        📅 Mis Asesorías
      </a>
      }
      }


      <!-- Área de usuario/login -->
      @if (!isAuthenticated()) {
      <button (click)="navigateToLogin()"
        class="px-4 py-2 rounded-md bg-white text-cyan-900 font-semibold shadow hover:bg-cyan-100 transition">
        Iniciar Sesión
      </button>

      <button (click)="navigateToRegister()" class="hover:text-cyan-300 transition">
        Registrarse
      </button>

      }

      @if (isAuthenticated() && currentUser()) {
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full bg-blue-100 text-primary-content flex items-center justify-center">
            <span class="text-lg font-bold">
              {{ currentUser()?.email?.charAt(0)?.toUpperCase() }}
            </span>
          </div>
        </label>

        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56">
          <li class="menu-title"><span class="text-xs">{{ currentUser()?.email }}</span></li>
          <li class="menu-title text-center">
            <span class="text-xs font-bold text-primary">
              @switch(userRole()) {
              @case('admin') { 👤 Administrador }
              @case('programador') { 💻 Programador }
              @default { 👥 Usuario }
              }
            </span>
          </li>
          <div class="divider my-0"></div>
          <li>
            <button (click)="logout()" class="btn btn-error btn-sm w-full text-left flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
      }
    </div>

  </div>
</section>
```

### auth.guard.ts
```java
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {

  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};

```

### role.guard.ts
```java
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data?.['role'];
  const userRole = authService.getUserRole();

  if (!userRole) {
    router.navigate(['/login']);
    return false;
  }

  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/']);
    return false;
  }

  return true;
};

```

### auth.interceptor.ts
```java
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

```

### advisory.model.ts
```java
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvisoryModel {

  constructor() { }

}
```

### project.model.ts
```java
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  repo: string;
  url: string;
}

```

### user.model.ts
```java
/**
 * Interface para usuarios del sistema
 * Define la estructura de datos de cada usuario en Firestore
 */
export interface Usuario {
  uid: string;                    // ID único de Firebase Auth
  email: string;                  // Correo electrónico
  nombre: string;                 // Nombre completo
  rol: 'admin' | 'programador' | 'usuario'; // Tipo de usuario
  fotoPerfil?: string;            // URL de la foto
  fechaRegistro: Date;            // Fecha de creación
  activo: boolean;                // Estado del usuario
}

/**
 * Interface para programadores
 * Extiende la información básica de usuario con datos profesionales
 */
export interface Programador extends Usuario {
  rol: 'programador';
  especialidad: string;           // Ej: "Frontend", "Backend", "Full Stack"
  descripcion: string;            // Breve descripción profesional
  fotoPerfil: string;             // Foto de perfil (requerida)
  contacto: {
    telefono?: string;
    whatsapp?: string;
    email: string;
  };
  redesSociales: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    portfolio?: string;
  };
  habilidades: string[];          // Array de tecnologías/habilidades
  proyectos: string[];            // IDs de proyectos asociados
}

/**
 * Interface para Administradores
 */
export interface Administrador extends Usuario {
  rol: 'admin';
  permiso_crear_usuarios?: boolean;
  permiso_editar_usuarios?: boolean;
  permiso_eliminar_usuarios?: boolean;
  permiso_gestionar_contenido?: boolean;
}

```

### advisory.service.ts
```java
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvisoryService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/appointments';

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByProgrammer(programmerId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/programmer/${programmerId}`);
  }

  create(advisory: any) {
    return this.http.post(this.apiUrl, advisory);
  }

  approve(id: number, message: string) {
    return this.http.put(`${this.apiUrl}/${id}/approve`, { message });
  }

  reject(id: number, message: string) {
    return this.http.put(`${this.apiUrl}/${id}/reject`, { message });
  }
}


```

### auth.service.ts
```java
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

```

### project.service.ts
```java
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/projects';

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getByProgrammer(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}/programmer/${id}`);
  }


  create(project: any) {
    return this.http.post(this.apiUrl, project);
  }

  update(id: number, project: any) {
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
```

### user.service.ts
```java
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/api/users';

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAllProgrammers() {
    return this.http.get<any[]>(`${this.apiUrl}/programmers`);
  }

}
```

### admin-panel.ts
```java
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminPanel implements OnInit {

  private userService = inject(UserService);

  usuarios: any[] = [];

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.userService.getAll()
      .subscribe(data => this.usuarios = data);
  }

  eliminarUsuario(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

    this.userService.delete(id)
      .subscribe(() => this.loadUsuarios());
  }
}

```

### admin-panel.html
```java
<section class="p-6 max-w-5xl mx-auto">
  <h2 class="text-2xl font-bold mb-6">Panel de Administración</h2>

  <div class="card p-4 shadow">
    <h3 class="font-semibold">Usuarios registrados</h3>
    <div class="divider"></div>

    <div *ngIf="usuarios.length === 0" class="text-gray-500">
      No hay usuarios registrados.
    </div>

    <ul>
      <li *ngFor="let u of usuarios">
        <div class="flex justify-between items-center py-3 border-b">
          <div>
            <div class="font-bold">
              {{ u.nombre }}
            </div>
            <div class="text-sm text-gray-600">
              {{ u.email }} — {{ u.role }}
            </div>
          </div>

          <button
            (click)="eliminarUsuario(u.id)"
            class="btn btn-sm btn-error">
            Eliminar
          </button>
        </div>
      </li>
    </ul>
  </div>
</section>

```

### login-page.ts
```java
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
      next: () => {
        this.loading = false;

        const roles = this.authService.getUserRole();

        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin']);
        } else if (roles.includes('ROLE_PROGRAMMER')) {
          this.router.navigate(['/programmer']);
        } else {
          this.router.navigate(['/']);
        }

      },

      error: () => {
        this.errorMessage = 'Credenciales incorrectas';
        this.loading = false;
      }
    });
  }
}

```

### login-page.html
```java
<section class="min-h-screen flex items-center justify-center bg-gray-100">

    <div class="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h2 class="text-3xl font-bold text-center text-cyan-900 mb-8">
            Iniciar Sesión
        </h2>

        <!-- ERROR -->
        <div *ngIf="errorMessage" class="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {{ errorMessage }}
        </div>

        <!-- EMAIL -->
        <div class="mb-5">
            <label class="block mb-2 font-semibold text-gray-700">
                Correo electrónico
            </label>
            <input type="email" [(ngModel)]="email"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                placeholder="ejemplo@email.com">
        </div>

        <!-- PASSWORD -->
        <div class="mb-6">
            <label class="block mb-2 font-semibold text-gray-700">
                Contraseña
            </label>
            <input type="password" [(ngModel)]="password"
                class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-700"
                placeholder="********">
        </div>

        <!-- BOTÓN -->
        <button (click)="login()" [disabled]="loading"
            class="w-full bg-cyan-900 text-white py-3 rounded-lg font-semibold hover:bg-cyan-800 transition">

            <span *ngIf="!loading">Ingresar</span>
            <span *ngIf="loading">Cargando...</span>

        </button>

    </div>

</section>
```

### register-page.ts
```java
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

```

### register-page.html
```java
<section class="min-h-screen flex items-center justify-center bg-gray-100">

    <div class="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

        <h2 class="text-3xl font-bold text-center text-cyan-900 mb-8">
            Crear Cuenta
        </h2>

        <!-- ERROR -->
        <div *ngIf="errorMessage" class="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {{ errorMessage }}
        </div>

        <!-- SUCCESS -->
        <div *ngIf="successMessage" class="bg-green-100 text-green-600 p-3 rounded-lg mb-4 text-sm text-center">
            {{ successMessage }}
        </div>

        <!-- NOMBRE -->
        <div class="mb-5">
            <label class="block mb-2 font-semibold text-gray-700">
                Nombre
            </label>
            <input type="text" [(ngModel)]="name"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-700"
                placeholder="Tu nombre completo">
        </div>

        <!-- EMAIL -->
        <div class="mb-5">
            <label class="block mb-2 font-semibold text-gray-700">
                Correo electrónico
            </label>
            <input type="email" [(ngModel)]="email"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-700"
                placeholder="ejemplo@email.com">
        </div>

        <!-- PASSWORD -->
        <div class="mb-6">
            <label class="block mb-2 font-semibold text-gray-700">
                Contraseña
            </label>
            <input type="password" [(ngModel)]="password"
                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cyan-700" placeholder="********">
        </div>

        <!-- BOTÓN -->
        <button (click)="register()" [disabled]="loading"
            class="w-full bg-cyan-900 text-white py-3 rounded-lg font-semibold hover:bg-cyan-800 transition">

            <span *ngIf="!loading">Registrarse</span>
            <span *ngIf="loading">Creando...</span>

        </button>

        <p class="text-center mt-6 text-sm">
            ¿Ya tienes cuenta?
            <a routerLink="/login" class="text-cyan-900 font-semibold hover:underline">
                Inicia sesión
            </a>
        </p>

    </div>

</section>
```

### perfil.ts
```java
import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { ProjectService } from '../../../core/services/project.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Perfil implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private userService = inject(UserService);
  private projectService = inject(ProjectService);

  programador: any;
  proyectos: any[] = [];

  ngOnInit() {

    window.scrollTo({ top: 0, behavior: 'smooth' });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.loadProgramador(id);
    this.loadProyectos(id);
  }

  loadProgramador(id: number) {
    this.userService.getById(id)
      .subscribe({
        next: (user) => this.programador = user,
        error: () => this.router.navigate(['/'])
      });
  }

  loadProyectos(id: number) {
    this.projectService.getByProgrammer(id)
      .subscribe({
        next: (data) => this.proyectos = data,
        error: () => this.proyectos = []
      });
  }
}

```

### perfil.html
```java
<section *ngIf="programador" class="max-w-6xl mx-auto mt-16 px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">

  <!-- COLUMNA IZQUIERDA -->
  <div class="bg-cyan-900 text-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6">

    <img [src]="programador.imageUrl || 'assets/default-user.png'"
         class="w-40 h-40 object-cover rounded-2xl shadow-lg border-4 border-white">

    <h2 class="text-3xl font-extrabold text-center">
      {{ programador.name }}
    </h2>

    <p class="opacity-90">{{ programador.role }}</p>

    <div class="text-sm text-center">
      <p>{{ programador.email }}</p>
    </div>

  </div>

  <!-- COLUMNA DERECHA -->
  <div class="lg:col-span-2 flex flex-col gap-10">

    <!-- SOBRE MI -->
    <div class="bg-white rounded-3xl shadow-xl p-8 border border-cyan-500">
      <h2 class="text-3xl font-extrabold mb-4 text-cyan-900">Sobre mí</h2>
      <p class="text-gray-700 leading-relaxed">
        {{ programador.description || 'Información no disponible.' }}
      </p>
    </div>

    <!-- PROYECTOS DINÁMICOS -->
    <div class="bg-white rounded-3xl shadow-xl p-8 border border-cyan-500">
      <h2 class="text-3xl font-extrabold mb-10 text-cyan-900 text-center">
        Proyectos
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div *ngFor="let p of proyectos"
             class="bg-white rounded-2xl border border-cyan-400 shadow-lg p-6">

          <h3 class="text-xl font-bold text-cyan-800 mb-2">
            {{ p.name }}
          </h3>

          <p class="text-gray-700 mb-4">
            {{ p.description }}
          </p>

        </div>

      </div>
    </div>

  </div>
</section>

```

### homePage.ts
```java
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './homePage.html',
  styleUrl: './homePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {

  private userService = inject(UserService);

  programadores: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    // 🔹 Obtener programadores desde backend
    this.userService.getAllProgrammers().subscribe({
      next: (data) => {
        this.programadores = data;
      },
      error: (err) => {
        console.error('Error al obtener programadores', err);
      }
    });

    // 🔹 Scroll automático por fragmentos (#proyectos)
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

}

```

### homePage.html
```java
<section id="equipo" class="w-full flex flex-col items-center mt-16 px-5 pt-20">

  <!-- TÍTULO -->
  <div class="text-center mb-14">
    <h2 class="text-4xl md:text-5xl font-extrabold tracking-wide text-cyan-900 font-serif">
      Equipo de Programadores
    </h2>
    <p class="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl">
      Conoce a los developers que impulsan este proyecto.
    </p>
  </div>

  <!-- SI NO HAY PROGRAMADORES -->
  <div *ngIf="programadores.length === 0" class="text-gray-500 text-lg">
    No hay programadores registrados aún.
  </div>

  <!-- GRID DINÁMICO -->
  <div *ngIf="programadores.length > 0"
       class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">

    <div *ngFor="let p of programadores"
         class="card bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300 rounded-2xl border border-gray-200">

      <figure class="p-4">
        <img [src]="p.fotoURL || 'assets/default-user.png'"
             class="h-56 w-full object-cover rounded-xl shadow-md" />
      </figure>

      <div class="card-body text-center">
        <h2 class="text-2xl font-bold text-cyan-900">
          {{ p.nombre }}
        </h2>

        <p class="font-medium text-gray-700">
          {{ p.especialidad }}
        </p>

        <p class="text-gray-500 text-sm mt-2">
          Estudiante de Computación – UPS
        </p>

        <div class="w-40 h-1 bg-cyan-900 mx-auto my-4 rounded-full"></div>

        <!-- SKILLS DINÁMICAS -->
        <div class="flex flex-wrap justify-center gap-2">
          <span *ngFor="let skill of p.skills"
                class="badge badge-outline border-cyan-900">
            {{ skill }}
          </span>
        </div>

        <div class="mt-6">
          <a [routerLink]="['/perfil', p.id]"
             class="btn btn-primary w-full">
            Ver Perfil
          </a>
        </div>
      </div>

    </div>
  </div>
</section>

```

### homePage.css
```java
/* Centrar contenido principal */
.container-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

/* Ajustes visuales para el título */
.main-title {
  font-weight: 700;
  letter-spacing: 1px;
}

/* Ajuste suave a las tarjetas (cards) */
.card:hover {
  transform: scale(1.02);
  transition: 0.2s ease-in-out;
}

/* Borde redondeado extra a las imágenes */
.card img {
  border-radius: 8px 8px 0 0;
}

/* Sombra suave al pasar el mouse */
.card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Espaciado general del homepage */
.home-wrapper {
  padding: 2rem;
}

/* Diseño responsivo para móviles */
@media (max-width: 600px) {
  .main-title {
    font-size: 1.8rem;
  }

  .card img {
    height: 200px;
  }
}

```

### programador-panel.ts
```java
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ProjectService } from '../../core/services/project.service';
import { AdvisoryService } from '../../core/services/advisory.service';

@Component({
  selector: 'app-programador-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './programador-panel.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ProgramadorPanel {

  private authService = inject(AuthService);
  private projectService = inject(ProjectService);
  private advisoryService = inject(AdvisoryService);

  userId!: number;
  proyectos: any[] = [];
  asesorias: any[] = [];

  constructor() {
    this.init();
  }

  init() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.userId = user.id;

    this.loadProyectos();
    this.loadAsesorias();
  }

  // ==========================
  // PROYECTOS
  // ==========================

  loadProyectos() {
    this.projectService.getAll()
      .subscribe(data => {
        this.proyectos = data.filter(
          (p: any) => p.programmerId === this.userId
        );
      });
  }

  crearProyecto(nombre: string, descripcion: string) {
    this.projectService.create({
      name: nombre,
      description: descripcion,
      programmerId: this.userId
    }).subscribe(() => this.loadProyectos());
  }

  editarProyecto(project: any) {
    this.projectService.update(project.id, {
      name: project.name,
      description: project.description
    }).subscribe(() => this.loadProyectos());
  }

  eliminarProyecto(id: number) {
    this.projectService.delete(id)
      .subscribe(() => this.loadProyectos());
  }

  // ==========================
  // ASESORIAS
  // ==========================

  loadAsesorias() {
    this.advisoryService.getAll()
      .subscribe(data => {
        this.asesorias = data.filter(
          (a: any) => a.programmerId === this.userId
        );
      });
  }

  responderAsesoria(id: number, estado: 'approve' | 'reject') {
    const message = prompt('Mensaje (opcional):') || '';

    if (estado === 'approve') {
      this.advisoryService.approve(id, message)
        .subscribe(() => this.loadAsesorias());
    } else {
      this.advisoryService.reject(id, message)
        .subscribe(() => this.loadAsesorias());
    }
  }
}

```

### programador-panel.html
```java
<section class="p-6 max-w-6xl mx-auto">

  <h2 class="text-3xl font-bold mb-8 text-cyan-900">
    Panel del Programador
  </h2>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

    <!-- ===================== -->
    <!-- MIS PROYECTOS -->
    <!-- ===================== -->

    <div class="card bg-white p-6 shadow-xl rounded-xl">

      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-cyan-800">
          Mis Proyectos
        </h3>

        <button
          (click)="crearProyecto('Nuevo Proyecto', 'Descripción del proyecto')"
          class="btn btn-primary btn-sm">
          + Nuevo
        </button>
      </div>

      <div class="divider"></div>

      <div *ngIf="proyectos.length === 0" class="text-gray-500 text-sm mt-4">
        No tienes proyectos registrados.
      </div>

      <ul>
        <li *ngFor="let p of proyectos" class="border-b py-4">

          <div class="flex justify-between items-start">

            <div>
              <div class="font-bold text-lg text-gray-800">
                {{ p.name }}
              </div>

              <div class="text-sm text-gray-600 mt-1">
                {{ p.description }}
              </div>
            </div>

            <div class="flex gap-2">

              <button
                (click)="editarProyecto(p)"
                class="btn btn-sm btn-outline">
                Editar
              </button>

              <button
                (click)="eliminarProyecto(p.id)"
                class="btn btn-sm btn-error">
                Eliminar
              </button>

            </div>

          </div>

        </li>
      </ul>

    </div>


    <!-- ===================== -->
    <!-- ASESORÍAS -->
    <!-- ===================== -->

    <div class="card bg-white p-6 shadow-xl rounded-xl">

      <h3 class="text-xl font-semibold text-cyan-800 mb-4">
        Solicitudes de Asesoría
      </h3>

      <div class="divider"></div>

      <div *ngIf="asesorias.length === 0" class="text-gray-500 text-sm mt-4">
        No tienes solicitudes de asesoría.
      </div>

      <ul>
        <li *ngFor="let a of asesorias" class="border-b py-4">

          <div class="font-semibold text-gray-800">
            {{ a.date }} {{ a.time }}
          </div>

          <div class="text-sm text-gray-600">
            Estado:
            <span
              [ngClass]="{
                'text-yellow-600': a.status === 'PENDING',
                'text-green-600': a.status === 'APPROVED',
                'text-red-600': a.status === 'REJECTED'
              }">
              {{ a.status }}
            </span>
          </div>

          <div class="text-sm mt-2 text-gray-700">
            {{ a.comment }}
          </div>

          <div
            *ngIf="a.status === 'PENDING'"
            class="mt-3 flex gap-2">

            <button
              (click)="responderAsesoria(a.id, 'approve')"
              class="btn btn-success btn-sm">
              Aprobar
            </button>

            <button
              (click)="responderAsesoria(a.id, 'reject')"
              class="btn btn-error btn-sm">
              Rechazar
            </button>

          </div>

        </li>
      </ul>

    </div>

  </div>

</section>

```
