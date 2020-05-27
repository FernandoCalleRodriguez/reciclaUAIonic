import {Component, OnInit} from '@angular/core';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.page.html',
    styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {
    usuarios: Usuario[];
    usuariosAux: Usuario[];

    constructor(private usuarioService: UsuarioService) {
        this.usuarioService.obtenerRanking().subscribe(result => {
            this.usuarios = result;
            this.usuariosAux = result;
            // console.log(this.usuarios);
        });
    }

    ngOnInit() {
    }

    filterByEmail(email: string) {
        if (email != '' && email != null) {
            const usuariosFilter = [];
            this.usuarios.forEach(u => {
                if (u.Email.includes(email)) {
                    usuariosFilter.push(u);
                }
            });
            this.usuariosAux = usuariosFilter;
            // console.log(this.usuariosAux);
        } else {
            this.usuariosAux = this.usuarios;
        }

    }

    obtenerPosicion(email): number {
        let posicion = 0;
        let contador: number;
        this.usuarios.forEach(u => {
            posicion++;
            if (u.Email == email) {
                contador = posicion;
            }
        });
        return contador;
    }
}
