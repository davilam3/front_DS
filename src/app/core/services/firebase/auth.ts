import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, user } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

   private auth: Auth = inject(Auth);
   // Aquí guardamos al usuario autenticado
  user = signal<any | null>(null);

  // Signal para el usuario actual
  currentUser = signal<User | null>(null);

  // Observable del estado de autenticación
  user$ = user(this.auth);

  constructor() {
    // Suscribirse a cambios en el estado de autenticación
    this.user$.subscribe(user => {
      this.currentUser.set(user);
    });
  }

  /**
   * Registrar nuevo usuario con email y password
   */
  register(email: string, password: string): Observable<any> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  /**
   * Login con email y password
   */
  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(this.auth, email, password);
    return from(promise);
  }

  /**
   * Login con Google
   */
  //   loginWithGoogle(): Observable<any> {
  //     const provider = new GoogleAuthProvider();
  //     const promise = signInWithPopup(this.auth, provider);
  //     return from(promise);
  //   }

  // ---------------------------
  // ESTADO DE AUTENTICACIÓN
  // ---------------------------
  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
  }

  // ---------------------------
  // EMAIL DEL USUARIO
  // ---------------------------
  get currentUserEmail(): string | null {
    return this.auth.currentUser?.email ?? null;
  }

  // ---------------------------
  // FOTO DEL USUARIO
  // ---------------------------
  get currentUserPhoto(): string | null {
    return this.auth.currentUser?.photoURL ?? null;
  }

  // ---------------------------
  // INICIAL DEL CORREO
  // ---------------------------
  get currentUserInitial(): string | null {
    const email = this.auth.currentUser?.email;
    return email ? email.charAt(0).toUpperCase() : null;
  }


  /**
   * Cerrar sesión
   */
  logout(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

  

  // private userSubject = new BehaviorSubject<User | null>(null);
  // user$ = this.userSubject.asObservable(); // por si lo usas después

  // constructor(private auth: Auth) {

  //   // Detecta cambios de sesión
  //   onAuthStateChanged(this.auth, (user) => {
  //     this.userSubject.next(user);
  //   });
  // }

  // // ---------------------------
  // // LOGIN
  // // ---------------------------
  // login(email: string, password: string) {
  //   return from(signInWithEmailAndPassword(this.auth, email, password));
  // }

  // // ---------------------------
  // // ESTADO DE AUTENTICACIÓN
  // // ---------------------------
  // isAuthenticated(): boolean {
  //   return this.auth.currentUser !== null;
  // }

  // // ---------------------------
  // // EMAIL DEL USUARIO
  // // ---------------------------
  // get currentUserEmail(): string | null {
  //   return this.auth.currentUser?.email ?? null;
  // }

  // // ---------------------------
  // // FOTO DEL USUARIO
  // // ---------------------------
  // get currentUserPhoto(): string | null {
  //   return this.auth.currentUser?.photoURL ?? null;
  // }

  // // ---------------------------
  // // INICIAL DEL CORREO
  // // ---------------------------
  // get currentUserInitial(): string | null {
  //   const email = this.auth.currentUser?.email;
  //   return email ? email.charAt(0).toUpperCase() : null;
  // }

  // // ---------------------------
  // // LOGOUT
  // // ---------------------------
  // logout() {
  //   return from(signOut(this.auth));
  // }

  

    // private auth: Auth = inject(Auth);
  // // Signal para el usuario actual
  // currentUser = signal<User | null>(null);

  // // Observable del estado de autenticación
  // user$ = user(this.auth);

  // constructor() {
  //   // Suscribirse a cambios en el estado de autenticación
  //   this.user$.subscribe(user => {
  //     this.currentUser.set(user);
  //   });
  // }

  // /**
  //  * Registrar nuevo usuario con email y password
  //  */
  // register(email: string, password: string): Observable<any> {
  //   const promise = createUserWithEmailAndPassword(this.auth, email, password);
  //   return from(promise);
  // }

  // /**
  //  * Login con email y password
  //  */
  // login(email: string, password: string): Observable<any> {
  //   const promise = signInWithEmailAndPassword(this.auth, email, password);
  //   return from(promise);
  // }

  // /**
  //  * Login con Google
  //  */
  // //   loginWithGoogle(): Observable<any> {
  // //     const provider = new GoogleAuthProvider();
  // //     const promise = signInWithPopup(this.auth, provider);
  // //     return from(promise);
  // //   }

  

  // /**
  //  * Cerrar sesión
  //  */
  // logout(): Observable<void> {
  //   const promise = signOut(this.auth);
  //   return from(promise);
  // }

  // /**
  //  * Verificar si hay un usuario autenticado
  //  */
  // isAuthenticated(): boolean {
  //   return this.currentUser() !== null;
  // }


}
