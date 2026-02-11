import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-programmer-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './programmer-card.html'
})
export class ProgrammerCardComponent {

  @Input() programador: any;
  @Output() editar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<number>();

  editarCard() {
    this.editar.emit(this.programador);
  }

  eliminarCard() {
    if (confirm('¿Eliminar programador?')) {
      this.eliminar.emit(this.programador.id);
    }
  }
}
