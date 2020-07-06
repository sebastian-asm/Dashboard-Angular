import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private authService: AngularFireAuth) {}

  login(login: any) {
    // Auth de Firebase devuelve una promesa
    return new Promise((resolve, reject) => {
      this.authService
        .signInWithEmailAndPassword(login.email, login.password)
        .then(
          (resp) => resolve(resp),
          (err) => reject(err)
        );
    });
  }

  getAuth() {
    // Obteniendo los datos de quién esta autenticado
    return this.authService.authState.pipe(map((auth) => auth));
  }

  logout() {
    this.authService.signOut();
  }
}
