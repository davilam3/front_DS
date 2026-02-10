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
