import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './availability.html'
})
export class AvailabilityComponent {

  // 🔹 Programadores (mock por ahora)
  programadores = [
    { id: 1, nombre: 'Diana Avila' },
    { id: 2, nombre: 'Carlos Pérez' }
  ];

  // 🔹 Formulario
  programadorId: number | null = null;
  fecha = '';
  hora = '';

  // 🔹 Horarios disponibles
  horarios = [
    '08:00', '09:00', '10:00',
    '11:00', '14:00', '15:00', '16:00'
  ];

  // 🔹 Disponibilidades creadas
  disponibilidades: any[] = [];

  guardarDisponibilidad() {

    if (!this.programadorId || !this.fecha || !this.hora) {
      alert('Todos los campos son obligatorios');
      return;
    }

    this.disponibilidades.push({
      id: Date.now(),
      programadorId: this.programadorId,
      programador: this.programadores.find(p => p.id === this.programadorId)?.nombre,
      fecha: this.fecha,
      hora: this.hora
    });

    // Limpiar formulario
    this.programadorId = null;
    this.fecha = '';
    this.hora = '';
  }
}
