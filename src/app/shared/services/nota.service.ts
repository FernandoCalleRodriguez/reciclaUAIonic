import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Nota} from '../models/nota';
import {Observable, of, Subject, throwError} from 'rxjs';
import {Storage} from '@ionic/storage';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  server = 'http://localhost:16209/api/';
  private token = localStorage.getItem('ACCESS_TOKEN');
  private headers: HttpHeaders = new HttpHeaders({Authorization: this.token});
  notas: Nota[];
  notasS: Nota[];
  private nNotificacionesNotas$ = new Subject<number>();


  constructor(private http: HttpClient,
              private storage: Storage) {
  }

  public obtenerNotaPorId(id) {
    return this.http.get<Nota>(this.server + 'NotaInformativa/' + id,{ headers: this.headers });
  }

  public obtenerTodasNotas() {
    return this.http.get<Nota[]>(this.server + 'NotaInformativa/BuscarTodos',{ headers: this.headers });
  }

  public obtenerNotasPorTitulo(texto: string) {
    return this.http.get<Nota[]>(this.server + 'NotaInformativa/BuscarPorTitulo?p_titulo=' + texto,{ headers: this.headers });
  }

  public agregarNotaStorage(nota: Nota) {
    this.obtenerNotasStorage().then( val => {
      console.log('Se obtienen las notas del Storage ' + val);
      if (val == null) {
        console.log('Se entra al caso storage vacio');
        const nuevanota: Nota[] = [nota];
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

  public actualizarNotificacionesNotas(n: number ) {
    console.log('Se entra a actualizar')
    // if (n === undefined) {
    //   this.nNotificacionesNotas$.next(0);
    //   console.log('Se actualiza con 0');
    // } else  {
    //   this.nNotificacionesNotas$.next(n);
    //   console.log('Se actualiza con n');
    // }
    this.nNotificacionesNotas$.next(n);
  }

  public obtenerCantidadNotasNoLeidas(): Observable<number> {
    return this.nNotificacionesNotas$.asObservable();
  }

}


