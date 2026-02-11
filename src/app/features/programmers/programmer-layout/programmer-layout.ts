import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgrammerSidebarComponent } from '../sidebar/programmer-sidebar';

@Component({
  selector: 'app-programmer-layout',
  standalone: true,
  imports: [RouterOutlet, ProgrammerSidebarComponent],
  templateUrl: './programmer-layout.html'
})
export class ProgrammerLayoutComponent {}
