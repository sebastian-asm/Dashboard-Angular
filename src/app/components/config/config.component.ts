import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  permitirEstado: boolean = false;

  constructor(private configService: ConfigService, private router: Router) {}

  ngOnInit(): void {
    // Cargando el valor correcto desde la db
    this.configService.getConfig().subscribe((resp) => {
      this.permitirEstado = resp.permitirRegistro;
    });
  }

  cambiarPermitirEstado() {
    this.permitirEstado = !this.permitirEstado;
  }

  guardarCambios() {
    this.configService.modifConfig({
      permitirRegistro: this.permitirEstado,
    });
    this.router.navigateByUrl('/');
  }
}
