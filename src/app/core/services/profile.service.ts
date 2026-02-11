import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PerfilProgramador } from '../models/profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  private perfilSubject = new BehaviorSubject<PerfilProgramador | null>(null);
  perfil$ = this.perfilSubject.asObservable();

  setPerfil(perfil: PerfilProgramador) {
    this.perfilSubject.next(perfil);
  }

  getPerfil(): PerfilProgramador | null {
    return this.perfilSubject.value;
  }
}
