import {Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {AlertController, MenuController, PopoverController} from '@ionic/angular';
import {ConfiguracionService} from '../../shared/services/configuracion.service';
import {PopoverComponent} from '../../shared/components/popover/popover.component';
import {AccionreciclarService} from '../../shared/services/accionreciclar.service';
import {AccionwebService} from '../../shared/services/accionweb.service';
import {Material} from '../../shared/models/material';
import {MaterialService} from '../../shared/services/materiel.service';
import {ItemService} from '../../shared/services/item.service';
import {PuntoService} from '../../shared/services/punto.service';
import {DudaService} from '../../shared/services/duda.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    usuario: Usuario;
    usuarios: Usuario[];
    posicion: number;
    propuestas = 0;
    acciones = 0;
    dudas = 0;

    constructor(private autenticacionService: AutenticacionService,
                private usuarioService: UsuarioService,
                public  menu: MenuController,
                public popoverController: PopoverController,
                private accionreciclarService: AccionreciclarService,
                private accionwebService: AccionwebService,
                private materialService: MaterialService,
                private itemService: ItemService,
                private puntoService: PuntoService,
                private dudaService: DudaService) {
        if (this.autenticacionService.isLogged()) {
            this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(result => {
                this.usuario = result;
                this.accionreciclarService.obtenerAccionReciclarPorUsuario(result.Id).subscribe(acciones => {
                    if (acciones != null) {
                        this.acciones += acciones.length;
                    }
                });
                this.accionwebService.obtenerAccionWebPorUsuario(result.Id).subscribe(acciones => {
                    if (acciones != null) {
                        this.acciones += acciones.length;
                    }
                });
                this.materialService.BuscarMaterialesPorUsuario(result.Id).subscribe(materiales => {
                    if (materiales != null) {
                        this.propuestas += materiales.length;
                    }
                });
                this.itemService.getByUserId(result.Id).subscribe(items => {
                    if (items != null) {
                        this.propuestas += items.length;
                    }
                });
                this.puntoService.getPuntoByUsuario(result.Id).subscribe(puntos => {
                    if (puntos != null) {
                        this.propuestas = puntos.length;
                    }
                });
                this.dudaService.getDudasByUsuario().subscribe(dudas => {
                    if (dudas != null) {
                        this.dudas = dudas.length;
                    }
                });

            });
            this.usuarioService.obtenerRanking().subscribe(usuarios => {
                this.usuarios = usuarios;
                this.posicion = this.obtenerPosicion(this.usuario.Id);
            });
        }
        this.menu.close();

    }

    ngOnInit() {
    }

    async presentPopover(ev: any) {
        const popover = await this.popoverController.create({
            component: PopoverComponent,
            event: ev,
            translucent: true,
            cssClass: 'larger-alert'
        });

        return await popover.present();
    }

    obtenerPosicion(id: number): number {
        let posicion = 0;
        let contador: number;
        this.usuarios.forEach(u => {
            posicion++;
            if (u.Id == id) {
                contador = posicion;
            }
        });

        return contador;
    }

}

