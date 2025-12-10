import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Footer } from "../../componentes/footer/footer";

@Component({
  selector: 'app-contacto',
  imports: [CommonModule,
    FormsModule, Footer],
  templateUrl: './contacto.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contacto {

  
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  solicitudes: any[] = [];

  form = {
    nombre: '',
    correo: '',
    horario: '',
    mensaje: ''
  };
  // Datos de contacto (ejemplo)
  contactoInfo = {
    email: 'contacto@miempresa.com',
    telefono: '+593 099 000 0000',
    direccion: 'Quito, Ecuador'
  };

  // Método opcional para procesar el envío del formulario
  enviarMensaje(): void {
    console.log('Mensaje enviado desde Contacto');
  }
  enviarFormulario() {
    const nueva = {
      ...this.form,
      fecha: new Date().toLocaleString()
    };

    this.solicitudes.push(nueva);

    alert('Solicitud enviada correctamente.');

    this.form = { nombre: '', correo: '', horario: '', mensaje: '' };
  }

  verSolicitudes() {
    // Puedes hacer scroll, abrir modal o simplemente mostrar la lista
  }


}
