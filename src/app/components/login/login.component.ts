import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private login: LoginService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Verificando si el usuario esta autenticado para no mostrar nuevamente el login
    // y direccionar al inicio
    this.login.getAuth().subscribe((resp) => {
      if (resp) {
        this.router.navigateByUrl('/');
      }
    });
  }

  getField(field: string) {
    return this.form.get(field);
  }

  ingresar() {
    this.login
      .login(this.form.value)
      .then(() => this.router.navigateByUrl('/'))
      .catch(() => (this.error = true));
  }
}
