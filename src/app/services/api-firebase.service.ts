import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root',
})
export class ApiFirebaseService {
  clientesCollection: AngularFirestoreCollection<Cliente>;
  clienteDocument: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Array<Cliente>>;
  cliente: Observable<Cliente>;

  constructor(private db: AngularFirestore) {
    this.clientesCollection = this.db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }

  getClientes(): Observable<Array<Cliente>> {
    // Obteniendo los datos desde firebase (id y payload)
    return (this.clientes = this.clientesCollection.snapshotChanges().pipe(
      map((data) => {
        return data.map((resp) => {
          const datos = resp.payload.doc.data() as Cliente;
          datos.id = resp.payload.doc.id;
          return datos;
        });
      })
    ));
  }

  addCliente(cliente: Cliente) {
    this.clientesCollection.add(cliente);
  }

  getCliente(id: string) {
    // Recuperando el documento a través del id
    this.clienteDocument = this.db.doc<Cliente>(`clientes/${id}`);
    return (this.cliente = this.clienteDocument.snapshotChanges().pipe(
      map((resp) => {
        if (!resp.payload.exists) {
          return null;
        } else {
          const data = resp.payload.data() as Cliente;
          data.id = resp.payload.id;
          return data;
        }
      })
    ));
  }

  modifCliente(cliente: Cliente, id: string) {
    this.clienteDocument = this.db.doc<Cliente>(`clientes/${id}`);
    this.clienteDocument.update(cliente);
  }

  deleteCliente(id: string) {
    this.clienteDocument = this.db.doc<Cliente>(`clientes/${id}`);
    this.clienteDocument.delete();
  }
}
