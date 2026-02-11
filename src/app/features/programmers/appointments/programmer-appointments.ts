import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-programmer-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programmer-appointments.html'
})
export class ProgrammerAppointmentsComponent implements OnInit {

  private appointmentService = inject(AppointmentService);
  private authService = inject(AuthService);

  asesorias: any[] = [];
  programmerId!: number;

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.programmerId = user.id;

    this.load();
  }

  load() {
    this.appointmentService
      .getByProgrammer(this.programmerId)
      .subscribe(data => this.asesorias = data);
  }

  aprobar(id: number) {
    this.appointmentService.approve(id).subscribe(() => this.load());
  }

  rechazar(id: number) {
    this.appointmentService.reject(id).subscribe(() => this.load());
  }

  completar(id: number) {
    this.appointmentService.complete(id).subscribe(() => this.load());
  }
}