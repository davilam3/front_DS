import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PerfilProgramador } from '../../../core/models/profile.model';
import { ProfileService } from '../../../core/services/profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProgrammerService } from '../../../core/services/programmer.service';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-view.html'
})
export class ProfileViewComponent implements OnInit {

  profile: any;
  private authService = inject(AuthService);
  private programmerService = inject(ProgrammerService);
  private route = inject(ActivatedRoute);
  private profileService = inject(ProfileService);

  perfil!: PerfilProgramador;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.programmerService.getByUserId(user.id)
      .subscribe(profile => this.profile = profile);
  }
  cargarPerfil(username: string | null): PerfilProgramador {
    return {
      id: 1,
      nombre: username ?? 'Programador',
      especialidad: 'Frontend Developer',
      foto: 'assets/default-user.jpg',

      correoEmpresarial: 'empresa@correo.com',
      correoPersonal: 'personal@gmail.com',
      telefono: '+593 99 999 9999',
      ubicacion: 'Ecuador',

      github: 'https://github.com',
      descripcion: 'Perfil profesional del programador.',

      horarios: [],
      skills: [],

      educacion: [],
      cursos: [],
      idiomas: [],

      experiencia: [],
      proyectos: []
    };
  }
}
