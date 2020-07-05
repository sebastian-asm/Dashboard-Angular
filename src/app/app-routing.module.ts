import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableroComponent } from './components/tablero/tablero.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfigComponent } from './components/config/config.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  { path: '', component: TableroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'config', component: ConfigComponent },
  { path: 'cliente/editar/:id', component: EditarClienteComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
