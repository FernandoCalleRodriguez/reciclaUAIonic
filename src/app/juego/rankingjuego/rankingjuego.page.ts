import {Component, OnInit} from '@angular/core';
import {JuegoService} from '../../shared/services/juego.service';
import {Juego} from '../../shared/models/juego';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';

@Component({
    selector: 'app-rankingjuego',
    templateUrl: './rankingjuego.page.html',
    styleUrls: ['./rankingjuego.page.scss'],
})
export class RankingjuegoPage implements OnInit {
    juegos: Juego[];
    juegosAux: Juego[];
    usuarios: Usuario[];
    usuariosAux: Usuario[];
    usuario: Usuario;

    constructor(private juegoService: JuegoService,
                private usuarioService: UsuarioService) {

        this.juegoService.ObtenerRanking().subscribe(juegos => {
            this.juegos = juegos;

            this.usuarioService.obtenerRanking().subscribe(usuarios => {
                this.usuarios = usuarios;
                this.usuariosAux = usuarios;
                let contador = 0;
                this.usuarios.forEach(usuario => {

                    this.juegoService.obtenerJuegoPorUsuario(usuario.Id).subscribe(juego => {
                        if (juego) {
                            this.juegos.find(j => j.Id == juego[0].Id).Usuarios_oid = usuario.Id;
                        }
                        if (contador + 1 == this.usuariosAux.length) {
                            this.juegosAux = this.juegos.sort(function(a, b) {
                                if (a.Puntuacion > b.Puntuacion) {
                                    return -1;
                                }
                                if (a.Puntuacion < b.Puntuacion) {
                                    return 1;
                                }
                                // a must be equal to b
                                return 0;
                            });
                        }
                        contador++;
                    });
                });
            });
        });


    }

    ngOnInit() {
    }

    filterByEmail(email: string) {
        if (email != '' && email != null) {
            const usuariosFilter = [];
            const juegosFilter = [];
            this.usuarios.forEach(u => {
                if (u.Email.includes(email)) {
                    this.juegos.forEach(j => {
                        if (u.Id == j.Usuarios_oid) {
                            juegosFilter.push(j);
                        }
                    });                }
            });
            this.juegosAux = juegosFilter;
        } else {
            this.juegosAux = this.juegos;
        }

    }

    obtenerPosicion(id): number {
        let posicion = 0;
        let contador: number;
        // tslint:disable-next-line:variable-name

        this.juegos.forEach(j => {
            posicion++;
            if (j.Usuarios_oid == id) {
                contador = posicion;
            }
        });
        return contador;
    }

    obtenerEmail(id) {

        if (this.usuarios && id != undefined) {

            let email: string;
            // tslint:disable-next-line:variable-name

            this.usuarios.forEach(j => {
                if (j.Id == id) {
                    email = j.Email;
                }
            });
            return email;
        }
    }


}
