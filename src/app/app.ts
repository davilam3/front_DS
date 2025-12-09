import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./componentes/navbar/navbar";
import { Footer } from "./componentes/footer/footer";
import { BackToTop } from "./componentes/back-to-top/back-to-top";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, BackToTop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-portafolio');
}
