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
