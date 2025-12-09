import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/firebase/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class Navbar {
  logo = 'assets/logo.png';


  authService = inject(AuthService);
  router = inject(Router);

  menuOpen = false;
  userInitial = '';
  isProgramador = false;

  constructor() {
    // Si está logeado, obtener datos
    if (this.authService.isAuthenticated()) {

      const email = this.authService.currentUserEmail;
      this.userInitial = this.authService.currentUserInitial ?? '';


      // Correos con permisos
      const programadores = ['avila.dianam04@gmail.com', 'chicotato04@gmail.com'];
      this.isProgramador = email !== null && programadores.includes(email);
    }
  }


  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/inicio']);
    });
  }

  async scrollToProjects(event: Event) {
    event.preventDefault();

    const go = () => {
      const el = document.getElementById('proyectos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Si ya estás en /inicio, solo baja
    if (this.router.url.includes('/inicio')) {
      go();
      return;
    }

    // Si estás en otra ruta, navega a /inicio sin fragmentos
    await this.router.navigate(['/inicio']);

    // Espera a que cargue la vista y luego baja
    setTimeout(() => go(), 80);
    
  }


}



//  authService = inject(AuthService);
// ruter = inject(Router);

//  menuOpen = false;
// userInitial = '';
// isProgramador = false;

// constructor() {
// if (this.authService.isAuthenticated()) {
//  const email = this.authService.currentUserEmail;
// this.userInitial = email ? email[0].toUpperCase() : '?';

//     // Correos de programadores autorizados
//     const programadores = ['diana@gmail.com', 'sebas@gmail.com'];
//      this.isProgramador = programadores.includes(email);
//   }
//  }

// toggleMenu() {
//    this.menuOpen = !this.menuOpen;
//  }

// logout() {
//   this.authService.logout();
//   this.router.navigate(['/login']);
// }