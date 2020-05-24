import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Item} from '../models/item';
import {Usuario} from '../models/usuario';
import {Juego} from '../models/juego';
import {AutenticacionService} from './autenticacion.service';

@Injectable({
    providedIn: 'root'
})
export class JuegoService {

    SERVER = 'http://localhost:16209/api/';

    private TOKEN = localStorage.getItem('ACCESS_TOKEN');
    private headers: HttpHeaders = new HttpHeaders({Authorization: this.TOKEN});

    constructor(private http: HttpClient,
                private autenticacionService: AutenticacionService) {
    }


    obtenerJuegoPorUsuario(id): Observable<Juego[]> {

        return this.http.get<Juego[]>(this.SERVER + 'Juego/BuscarJuegoPorUsuario?p_usuario=' + id, this.getHeaderToken());
    }

    CrearJuego(juego: Juego): Observable<Juego> {
        return this.http.post<Juego>(this.SERVER + 'Juego/Crear', juego, this.getHeaderToken());

    }

    ObtenerRanking(): Observable<Juego[]> {
        return this.http.get<Juego[]>(this.SERVER + 'Juego/BuscarTodos', this.getHeaderToken());
    }

    SiguienteNivel(tipo: number, juego: Juego): Observable<Juego> {
        return this.http.post<Juego>(this.SERVER + 'Juego/SiguienteItem?p_oid=' + juego.Id + '&p_tipocontenedor=' + tipo, juego,
            this.getHeaderToken());
    }

    private getHeaderToken() {

        const header = {
            Authorization: this.autenticacionService.getToken(),
        };

        const requestOptions = {
            headers: new HttpHeaders(header),
        };
        return requestOptions;
    }
}
