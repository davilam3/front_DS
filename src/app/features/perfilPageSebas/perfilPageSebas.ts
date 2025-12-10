import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer } from "../../componentes/footer/footer";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-page-sebas',
  imports: [Footer, RouterModule],
  templateUrl: './perfilPageSebas.html',
  styleUrl: './perfilPageSebas.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilPageSebas { 
  ngOnInit() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
