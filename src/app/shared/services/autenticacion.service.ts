import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Usuario} from '../models/usuario';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService {

    SERVER = 'http://localhost:16209/api/';
    private token: string;
    usuario: Usuario;

    constructor(private http: HttpClient,
                private router: Router) {
    }

    const;
    subject = new Subject<Usuario>();

    Login(usuario: Usuario): Observable<string> {
        return this.http.post<string>(this.SERVER + 'UsuarioWebNoAutenticado/Login', usuario).pipe(map(
            res => {
                this.saveToken(res);
                if (res != null) {
                    this.subject.next(usuario);
                }
                return res;
            }));
    }

    Logout(): void {
        // localStorage.setItem('ACCESS_TOKEN', null);
        // localStorage.setItem('ID_USER', null);

        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('ID_USER');
        this.router.navigate(['/login']);

    }

    private saveToken(token: string): void {
        localStorage.setItem('ACCESS_TOKEN', token);
        localStorage.setItem('ID_USER', this.parseJwt(token).id);

    }

    private parseJwt(token) {
        if (token != 'null') {

            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        }
        return -1;
    }

    getToken(): string {
        this.token = localStorage.getItem('ACCESS_TOKEN');

        return this.token;

    }

    getID(): string {
        return localStorage.getItem('ID_USER');
    }

    isLogged(): boolean {
        return this.getToken() != null && this.getID() != null && this.getID() == this.parseJwt(this.getToken()).id;
    }

    estaAutenticado() {
        if (!this.isLogged()) {
            this.router.navigate(['/login']);
        }
    }

    noEstaAutenticado() {
        if (this.isLogged()) {
            this.router.navigate(['/home']);
        } else {
        }
    }

    generarContrasena(): string {
        const caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789';
        let contraseña = '';
        for (let i = 0; i < 12; i++) {
            contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return contraseña;
    }

}
