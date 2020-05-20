import {Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {JuegoService} from '../../shared/services/juego.service';
import {Juego} from '../../shared/models/juego';
import {NivelService} from '../../shared/services/nivel.service';
import {ItemService} from '../../shared/services/item.service';
import {Nivel} from '../../shared/models/nivel';
import {Item} from '../../shared/models/item';

@Component({
    selector: 'app-juego',
    templateUrl: './juego.page.html',
    styleUrls: ['./juego.page.scss'],
})
export class JuegoPage implements OnInit {
    usuario: Usuario;
    juego: Juego;
    niveles: Nivel[];
    nivelActual: Nivel;
    items: Item[];
    itemActual: Item;

    constructor(private autenticacionService: AutenticacionService,
                private usuarioService: UsuarioService,
                private juegoService: JuegoService,
                private nivelService: NivelService,
                private itemService: ItemService) {

        this.usuarioService.getLoggedUser().subscribe(usuario => {
            this.usuario = usuario;
            console.log(this.usuario.Juego);
            if (this.usuario.Juego == null) {
                this.juego = {
                    Usuarios_oid: this.usuario.Id,

                };
                this.juegoService.CrearJuego(this.juego).subscribe(result => {
                    this.juego = result;
                    console.log(this.juego);
                    this.obtenerNivel();

                });
            } else {
                this.juego = this.usuario.Juego;
                this.obtenerNivel();
            }
        });
    }

    ngOnInit() {
    }

    obtenerNivel() {
        this.nivelService.getNiveles().subscribe(niveles => {
            this.niveles = niveles;
            this.nivelActual = this.niveles.find(n => n.Numero == this.juego.NivelActual);
            console.log(this.nivelActual);
            this.obtenerItem(this.nivelActual.Id);
        });

    }

    obtenerItem(nivel) {

        this.itemService.BuscarItemsPorNivel(nivel).subscribe(items => {
            console.log(items);
            this.itemActual = items[this.juego.ItemActual];
            console.log(this.itemActual);

        });

    }
}
