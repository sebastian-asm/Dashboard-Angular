import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiFirebaseService } from 'src/app/services/api-firebase.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {
  id: string;
  form: FormGroup;

  constructor(
    private api: ApiFirebaseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      saldo: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.api.getCliente(this.id).subscribe((cliente) => {
      if (cliente !== null) {
        this.form.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          saldo: cliente.saldo,
        });
      }
    });
  }

  getField(field: string) {
    return this.form.get(field);
  }

  actualizarCliente() {
    if (this.form.invalid || this.form.status === 'INVALID') return;

    this.api.modifCliente(this.form.value, this.id);
    this.router.navigateByUrl('/');
  }

  eliminarCliente() {
    this.api.deleteCliente(this.id);
    this.router.navigateByUrl('/');
  }
}
