import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminPanel implements OnInit {

  private userService = inject(UserService);

  usuarios: any[] = [];

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.userService.getAll()
      .subscribe(data => this.usuarios = data);
  }

  eliminarUsuario(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

    this.userService.delete(id)
      .subscribe(() => this.loadUsuarios());
  }
}
