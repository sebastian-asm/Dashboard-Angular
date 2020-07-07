import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardGuard } from './guard/guard.guard';
import { ConfigGuard } from './guard/config.guard';

import { TableroComponent } from './components/tablero/tablero.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfigComponent } from './components/config/config.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  { path: '', component: TableroComponent, canActivate: [GuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent, canActivate: [ConfigGuard] },
  { path: 'config', component: ConfigComponent, canActivate: [GuardGuard] },
  {
    path: 'cliente/editar/:id',
    component: EditarClienteComponent,
    canActivate: [GuardGuard],
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
