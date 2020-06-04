import {Injectable} from '@angular/core';
import {Usuario} from '../models/usuario';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AutenticacionService} from './autenticacion.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    SERVER = 'http://reciclaua.azurewebsites.net/api/';

    constructor(private http: HttpClient,
                private autenticacionService: AutenticacionService,) {
    }


    CrearUsuario(usuario: Usuario, tipo: string): Observable<Usuario> {
        // console.log(usuario);
        return this.http.post<Usuario>(this.SERVER + 'UsuarioWebNoRegistrado/Crear', usuario);

    }

    obtenerUsuarioPorId(id, tipo: string): Observable<Usuario> {
        let url;

        if (tipo === 'web') {
            url = 'UsuarioWebAutenticado/';
        } else if (tipo === 'administrador') {
            //url = 'UsuarioAdminAutenticado/';
        }

        return this.http.get<Usuario>(this.SERVER + url + id, this.getHeaderToken());

    }

    obtenerUsuarioPorEmail(email): Observable<Usuario> {
        return this.http.get<Usuario>(this.SERVER + 'UsuarioWebNoAutenticado/BuscarPorCorreo?p_correo=' + email);
    }

    modificarUsuario(usuario: Usuario, tipo: string): Observable<Usuario> {
        let url;

        if (tipo === 'web') {
            url = 'UsuarioWebAutenticado/Modificar?idUsuarioWebAutenticado=';
        }
        return this.http.put<Usuario>(this.SERVER + url + usuario.Id, usuario, this.getHeaderToken());
    }

    borrarUsuario(id, tipo: string): Observable<void> {
        let url;

        if (tipo === 'web') {
            url = 'UsuarioWebAutenticado/Borrar/?p_usuarioweb_oid=';
        } else if (tipo === 'administrador') {
            //url = 'UsuarioAdminAutenticado/Borrar?p_usuarioadministrador_oid=';
        }
        return this.http.delete<void>(this.SERVER + url + id, this.getHeaderToken());
    }

    obtenerRanking(): Observable<Usuario[]> {
        return this.http.get<Usuario[]>(this.SERVER + 'UsuarioWebAutenticado/ObtenerRanking', this.getHeaderToken());
    }

    verificarEmail(id): Observable<void> {
        return this.http.post<void>(this.SERVER + 'UsuarioWebNoRegistrado/VerificarEmail?p_usuarioweb_oid=' + id, this.getHeaderToken());
    }

    recuperarPass(usuario: Usuario): Observable<void> {
        // tslint:disable-next-line:max-line-length
        return this.http.put<void>(this.SERVER + 'UsuarioWebNoRegistrado/RecuperarPassword?idUsuarioWebNoRegistrado=' + usuario.Id, usuario);

    }

    cambiarPass(usuario: Usuario): Observable<Usuario> {
        // tslint:disable-next-line:max-line-length
        return this.http.put<Usuario>(this.SERVER + 'UsuarioWebAutenticado/CambiarPassword?idUsuarioWebAutenticado=' + usuario.Id, usuario, this.getHeaderToken());
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

    public getLoggedUser(): Observable<Usuario> {
        if (this.autenticacionService.isLogged()) {
            return this.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web');
        }
        return null;
    }
}
