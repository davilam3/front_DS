import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfilProgramador } from '../../../core/models/profile.model';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-edit.html'
})
export class ProfileEditComponent implements OnInit {

  private profileService = inject(ProfileService);

  perfil!: PerfilProgramador;

  ngOnInit() {
    const perfilGuardado = this.profileService.getPerfil();

    this.perfil = perfilGuardado ?? {
      id: 1,
      nombre: '',
      especialidad: '',
      foto: '',
      correoEmpresarial: '',
      correoPersonal: '',
      telefono: '',
      ubicacion: '',
      descripcion: '',
      github: '',
      horarios: [],
      skills: [],
      educacion: [],
      cursos: [],
      idiomas: [],
      experiencia: [],
      proyectos: []
    };
  }

  guardarCambios() {
    this.profileService.setPerfil(this.perfil);
    alert('Perfil actualizado correctamente');
  }
  nuevaSkill = '';

  agregarSkill() {
    if (this.nuevaSkill) {
      this.perfil.skills.push(this.nuevaSkill);
      this.nuevaSkill = '';
    }
  }

}