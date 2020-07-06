import { Component, OnInit } from '@angular/core';

import { ApiFirebaseService } from '../../services/api-firebase.service';
import { Cliente } from 'src/app/interfaces/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Array<Cliente>;
  loading: boolean;

  constructor(private api: ApiFirebaseService) {}

  ngOnInit(): void {
    this.loading = true;
    this.api.getClientes().subscribe((resp) => {
      this.clientes = resp;
      this.loading = false;
    });
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
}
