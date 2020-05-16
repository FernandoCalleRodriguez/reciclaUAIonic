import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Nota} from '../models/nota';
import {Observable, of, throwError} from 'rxjs';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  server = 'http://localhost:16209/api/';
  // private token = localStorage.getItem('ACCESS_TOKEN');
  // private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});
  notas: Nota[];
  notasS: Nota[];

  constructor(private http: HttpClient,
              private storage: Storage) {
  }

  public obtenerNotaPorId(id) {
    return this.http.get<Nota>(this.server + 'NotaInformativa/' + id);
  }

  public obtenerTodasNotas() {
    return this.http.get<Nota[]>(this.server + 'NotaInformativa/BuscarTodos');
  }

  public agregarNotaStorage(nota: Nota) {
    this.obtenerNotasStorage().then( val => {
      //this.notasS = val;
      console.log('Se obtienen las notas del Storage ' + val)
      if (val == null) {
        console.log('Se entra al caso storage vacio');
        const nuevanota: Nota[] = [nota]
        this.storage.set('notasLeidas', nuevanota);
        console.log('Case NEW - Storage listo');
      } else {
        this.notas = val;
        let i;
        let check = false;
        for (i = 0; i < this.notas.length; i++) {
            if (this.notas[i].Id === nota.Id) {
              check = true;
            }
        }
        if (check === false) {
          this.notas.push(nota);
          this.storage.set('notasLeidas', this.notas);
          console.log('If ADD -Storage listo' + this.notas.length);
        } else {
          console.log('La nota ya esta en el storage');
        }
      }
    });
  }

  public obtenerNotasStorage(): Promise<Nota[]> {
      return this.storage.get('notasLeidas');
      console.log('Se obtienen las notas del storage');
  }

  public identificarNotasLeidas(): Observable<Nota[]> {
    this.obtenerTodasNotas().subscribe( res => {
      this.notas = res;
      if (this.notas.length > 0) {
        this.obtenerNotasStorage().then( res2 => {
          this.notasS = res2;
          if (this.notasS.length > 0) {
            const notasNoLeidas = this.notas.filter(item => this.notasS.indexOf(item) < 0);
            console.log('No se han leido ' +  notasNoLeidas);

            // Se identifican las notas leidas
            for (let i = 0; i < this.notas.length ; i++) {
              console.log('Se entra al for');
              if (this.notas[i].Id === this.notasS[i].Id) {
                this.notas[i].Leida = true;
                console.log('Ya leido' + this.notas[i].Id);
              }
            }
            return this.notas;
          }
        });
      }
    });
    return null;
}
  public obtenerCantidadNotasNoLeidas() {

  }

}


