import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html'
})
export class UserListComponent {

  filtro: 'USERS' | 'PROGRAMMERS' = 'USERS';

  cambiarFiltro(valor: 'USERS' | 'PROGRAMMERS') {
    this.filtro = valor;
  }
}
