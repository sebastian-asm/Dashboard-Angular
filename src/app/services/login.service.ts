import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

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
          (login) => resolve(login),
          (err) => reject(err)
        );
    });
  }
}
