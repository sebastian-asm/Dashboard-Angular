import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  error: boolean;
  mensajeError: string;

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
    this.login.getAuth().subscribe((resp) => {
      if (resp) {
        this.router.navigateByUrl('/');
      }
    });
  }

  getField(field: string) {
    return this.form.get(field);
  }

  registro() {
    this.error = false;
    this.login
      .signup(this.form.value)
      .then(() => {
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        this.mensajeError = err.message;
        this.error = true;
      });
  }
}
