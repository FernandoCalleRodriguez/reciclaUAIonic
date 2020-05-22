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
import {TipoContenedor} from '../../shared/models/contenedor';
import {Router} from '@angular/router';
import {ConfiguracionService} from '../../shared/services/configuracion.service';
import {AlertController, NavController} from '@ionic/angular';

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
    isInvalidA: boolean;
    isInvalidG: boolean;
    isInvalidAz: boolean;
    isInvalidV: boolean;

    constructor(private usuarioService: UsuarioService,
                private juegoService: JuegoService,
                private nivelService: NivelService,
                private itemService: ItemService,
                private  route: Router,
                private config: ConfiguracionService,
                private navCtrl: NavController,
                private alertController: AlertController) {

        this.usuarioService.getLoggedUser().subscribe(usuario => {
            this.usuario = usuario;

            console.log(this.usuario.Id);
            this.juegoService.obtenerJuegoPorUsuario(this.usuario.Id).subscribe(result => {
                if (result == null) {
                    this.juego = {
                        Usuarios_oid: this.usuario.Id,

                    };
                    this.juegoService.CrearJuego(this.juego).subscribe(juego => {
                        this.juego = juego;
                        console.log(this.juego);
                        this.obtenerNivel();

                    });
                } else {
                    this.juego = result[0];
                    this.obtenerNivel();
                }
            });
        });

    }

    ngOnInit() {
        this.inicializarDisabled();
    }

    obtenerNivel() {
        if (this.juego.Finalizado) {
            this.presentAlert();
        } else {

            this.nivelService.getNiveles().subscribe(niveles => {
                this.niveles = niveles;
                this.nivelActual = this.niveles.find(n => n.Numero == this.juego.NivelActual);
                console.log(this.nivelActual);
                this.obtenerItem(this.nivelActual.Id);
            });
        }
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

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Fin del Juego',
            subHeader: 'Te has pasado el juego con una puntuación de ' + Math.round(this.juego.Puntuacion) ,
            buttons: [
                {
                    text: 'Ir al inicio',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        this.route.navigate(['/home']);
                    }
                },
            ]
        });

        await alert.present();
    }

    enviarRespuesta(tipo: number) {

        this.juegoService.SiguienteNivel(tipo, this.juego).subscribe(result => {
            console.log(result);
            this.juego = result;
            if (this.juego.IntentosItemActual > 1) {
                console.log('fallo');
                this.config.presentToast('Respuesta incorrecta', 'danger');

                if (tipo === 1) {
                    this.isInvalidAz = true;

                } else if (tipo === 2) {
                    this.isInvalidV = true;

                } else if (tipo === 3) {
                    this.isInvalidA = true;

                } else {
                    this.isInvalidG = true;

                }
            } else {
                this.juego = result;
                this.inicializarDisabled();
                this.obtenerNivel();
                this.config.presentToast('Respuesta correcta', 'success');
            }

        });
    }

    inicializarDisabled() {
        this.isInvalidA = false;
        this.isInvalidV = false;
        this.isInvalidAz = false;
        this.isInvalidG = false;
    }


    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }
}
