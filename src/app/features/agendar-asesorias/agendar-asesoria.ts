import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AppointmentService } from '../../core/services/appointment.service';
import { AuthService } from '../../core/services/auth.service';
import { PortfolioService } from '../../core/services/portafolio.service';

@Component({
  selector: 'app-agendar-asesoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agendar-asesoria.html'
})
export class AgendarAsesoriaComponent implements OnInit {

  private appointmentService = inject(AppointmentService);
  private authService = inject(AuthService);
  private portfolioService = inject(PortfolioService);
  private router = inject(Router);

  /* ============================
   * USUARIO
   * ============================ */
  clientId!: number;

  /* ============================
   * PROGRAMADORES
   * ============================ */
  programadores: any[] = [];
  programmerId!: number;

  /* ============================
   * FORMULARIO
   * ============================ */
  fecha = '';
  horario = '';
  mensaje = '';

  horariosDisponibles: string[] = [
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00'
  ];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const user = this.authService.getCurrentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    this.clientId = user.id;

    this.cargarProgramadores();
  }

  /* ============================
   * CARGAR PROGRAMADORES
   * ============================ */
  cargarProgramadores() {
    this.portfolioService.getAll().subscribe(data => {
      this.programadores = data;
    });
  }

  /* ============================
   * ENVIAR ASESORÍA
   * ============================ */
  enviarSolicitud(): void {

    if (!this.programmerId || !this.fecha || !this.horario) {
      alert('Debes completar todos los campos obligatorios');
      return;
    }

    const payload = {
      programmerId: this.programmerId,
      clientId: this.clientId,
      date: this.fecha,
      time: this.horario,
      message: this.mensaje
    };

    this.appointmentService.create(payload).subscribe({
      next: () => {
        alert('Asesoría agendada correctamente');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Error al enviar la solicitud');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}
