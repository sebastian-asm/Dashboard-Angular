import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiFirebaseService } from '../../services/api-firebase.service';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  @ViewChild('cerrarModal') cerrarModal: ElementRef;

  clientes: Array<Cliente>;
  loading: boolean;
  form: FormGroup;

  constructor(
    private api: ApiFirebaseService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      saldo: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.api.getClientes().subscribe((resp) => {
      this.clientes = resp;
      this.loading = false;
    });
  }

  getField(field: string) {
    return this.form.get(field);
  }

  guardarCliente() {
    if (this.form.invalid || this.form.status === 'INVALID') return;

    this.api.addCliente(this.form.value);
    this.form.reset();
    // Haciendo referencia al click del botón para cerrar el modal
    this.cerrarModal.nativeElement.click();
  }

  getSaldoTotal(): number {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }

  eliminarCliente(id: string) {
    this.api.deleteCliente(id);
  }
}
