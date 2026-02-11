import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgrammerCardComponent } from '../programmer-card/programmer-card';
import { ProgrammerFormComponent } from '../programmer-form/programmer-form';

@Component({
  selector: 'app-programmer-list',
  standalone: true,
  imports: [CommonModule, ProgrammerCardComponent, ProgrammerFormComponent],
  templateUrl: './programmer-list.html'
})
export class ProgrammerListComponent {

  programadores: any[] = [];

  mostrarFormulario = false;
  programadorEnEdicion: any = null;

  agregarProgramador() {
    this.programadorEnEdicion = {
      nombre: '',
      especialidad: '',
      descripcion: '',
      imagen: '',
      skills: []
    };
    this.mostrarFormulario = true;
  }

  guardarProgramador(programador: any) {

    if (programador.id) {
      // EDITAR
      const index = this.programadores.findIndex(p => p.id === programador.id);
      this.programadores[index] = programador;
    } else {
      // CREAR
      programador.id = Date.now();
      this.programadores = [...this.programadores, programador]; 
    }

    this.mostrarFormulario = false;
  }


  editarProgramador(programador: any) {
    this.programadorEnEdicion = programador;
    this.mostrarFormulario = true;
  }

  eliminarProgramador(id: number) {
    this.programadores = this.programadores.filter(p => p.id !== id);
  }

  cancelarFormulario() {
    this.mostrarFormulario = false;
  }
}
