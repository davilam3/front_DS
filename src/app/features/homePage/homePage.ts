import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Footer } from "../../componentes/footer/footer";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, Footer],
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
