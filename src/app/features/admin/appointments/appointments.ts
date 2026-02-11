import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.html'
})
export class AdminAppointmentsComponent implements OnInit {

  private appointmentService = inject(AppointmentService);

  appointments: any[] = [];
  filtro: 'ALL' | 'USERS' | 'PROGRAMMERS' = 'ALL';

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.appointmentService.getAll().subscribe(res => {
      this.appointments = res.content;
    });
  }

  cambiarFiltro(tipo: 'ALL' | 'USERS' | 'PROGRAMMERS') {
    this.filtro = tipo;

    if (tipo === 'ALL') {
      this.loadAll();
    }

    if (tipo === 'USERS') {
      this.appointmentService.search({ clientId: 1 }).subscribe(res => {
        this.appointments = res.content;
      });
    }

    if (tipo === 'PROGRAMMERS') {
      this.appointmentService.search({ programmerId: 1 }).subscribe(res => {
        this.appointments = res.content;
      });
    }
  }

  get appointmentsFiltradas() {
    if (this.filtro === 'USERS') {
      return this.appointments.filter(a => a.usuario);
    }
    if (this.filtro === 'PROGRAMMERS') {
      return this.appointments.filter(a => a.programador);
    }
    return this.appointments;
  }

  badgeEstado(estado: string) {
    switch (estado) {
      case 'ACEPTADA': return 'badge-success';
      case 'RECHAZADA': return 'badge-error';
      default: return 'badge-warning';
    }
  }
}

