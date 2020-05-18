import {Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {AlertController, MenuController, PopoverController} from '@ionic/angular';
import {ConfiguracionService} from '../../shared/services/configuracion.service';
import {PopoverComponent} from '../../shared/components/popover/popover.component';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

    usuario: Usuario;
    posicion: number;

    constructor(private autenticacionService: AutenticacionService,
                private usuarioService: UsuarioService,
                public  menu: MenuController,
                public popoverController: PopoverController) {
        if (this.autenticacionService.isLogged()) {
            this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(result => {
                this.usuario = result;
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
            translucent: true
        });

        return await popover.present();
    }

    obtenerPosicion(id: number): number {
        let posicion = 0;
        let contador: number;
        this.usuarioService.obtenerRanking().subscribe(usuarios => {
            usuarios.forEach(u => {
                posicion++;
                if (u.Id == id) {
                    contador = posicion;
                }
            });
        });

        return contador;
    }

}

