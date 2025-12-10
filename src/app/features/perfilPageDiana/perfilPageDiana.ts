import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Footer } from "../../componentes/footer/footer";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil-page-diana',
  imports: [Footer, RouterModule],
  templateUrl: './perfilPageDiana.html',
  styleUrl: './perfilPageDiana.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilPageDiana { 
  ngOnInit() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
