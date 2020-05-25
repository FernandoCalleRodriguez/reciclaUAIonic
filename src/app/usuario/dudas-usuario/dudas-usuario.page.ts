import {Component, OnInit} from '@angular/core';
import {Duda} from '../../shared/models/duda';
import {Usuario} from '../../shared/models/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import {DudaService} from '../../shared/services/duda.service';

@Component({
    selector: 'app-dudas-usuario',
    templateUrl: './dudas-usuario.page.html',
    styleUrls: ['./dudas-usuario.page.scss'],
})
export class DudasUsuarioPage implements OnInit {

    public dudas: Duda[] = null;
    public usuario: Usuario = null;

    constructor(protected usuarioService: UsuarioService, protected dudaService: DudaService) {
    }

    ionViewWillEnter() {
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
            this.dudaService.getAllDudas().subscribe(d => {
                this.dudas = d.filter(duda => {
                    return duda.UsuarioDuda.Id == this.usuario.Id;
                });
            });
        });
    }

    ngOnInit() {
    }

}
