import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Configuracion } from '../interfaces/configuracion';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  configDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion>;
  id: number = 1;

  constructor(private db: AngularFirestore) {}

  getConfig(): Observable<Configuracion> {
    this.configDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    return (this.configuracion = this.configDoc.valueChanges());
  }

  modifConfig(config: Configuracion) {
    this.configDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configDoc.update(config);
  }
}
