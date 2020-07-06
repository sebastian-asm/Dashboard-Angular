import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfigComponent } from './components/config/config.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from './components/error404/error404.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientesComponent,
    TableroComponent,
    EditarClienteComponent,
    LoginComponent,
    SignupComponent,
    ConfigComponent,
    FooterComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
