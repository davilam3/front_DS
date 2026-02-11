import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-programmer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './programmer-form.html'
})
export class ProgrammerFormComponent implements OnInit{

  ngOnInit() {
  if (!this.programador.skills) {
    this.programador.skills = [];
  }
}
  @Input() programador: any = {
    email: '' , 
    nombre: '',
    especialidad: '',
    descripcion: '',
    imagen: '',
    skills: []
  };

  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  nuevaSkill = '';

  agregarSkill() {
    if (this.nuevaSkill) {
      this.programador.skills.push(this.nuevaSkill);
      this.nuevaSkill = '';
    }
  }

 guardarCambios() {
  const programadorFinal = {
    id: this.programador.id,
    nombre: this.programador.nombre,
    especialidad: this.programador.especialidad,
    descripcion: this.programador.descripcion,
    imagen: this.programador.imagen || 'assets/default-user.jpg',
    skills: this.programador.skills || []
  };

  this.guardar.emit(programadorFinal);
}

}
