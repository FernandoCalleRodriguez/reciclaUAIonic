import {Component, OnInit} from '@angular/core';
import {Item} from '../../shared/models/item';
import {ItemService} from '../../shared/services/item.service';
import {MaterialService} from '../../shared/services/materiel.service';
import {PuntoService} from '../../shared/services/punto.service';
import {ValidacionService} from '../../shared/services/validacion.service';
import {Estado} from '../../shared/models/estado';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';

@Component({
    selector: 'app-propuestas-usuario',
    templateUrl: './propuestas-usuario.page.html',
    styleUrls: ['./propuestas-usuario.page.scss'],
})
export class PropuestasUsuarioPage implements OnInit {

    public estados: Estado[] = null;
    public usuario: Usuario = null;
    public propuestas = [
        {
            id: 1,
            categoria: 'Ítems',
            elementos: [],
            controles: []
        },
        {
            id: 2,
            categoria: 'Materiales',
            elementos: [],
            controles: []
        },
        {
            id: 3,
            categoria: 'Puntos de reciclaje',
            elementos: [],
            controles: []
        },
    ];

    constructor(protected itemService: ItemService, protected materialService: MaterialService, protected puntoService: PuntoService,
                protected validacionService: ValidacionService, protected usuarioService: UsuarioService) {
        this.estados = this.validacionService.getEstados();
    }

    ngOnInit() {
        this.propuestas.forEach(p => {
            this.estados.forEach(e => {
                p.controles.push(true);
            });
        });
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
            this.itemService.getByUserId(this.usuario.Id).subscribe(i => {
                this.propuestas[0].elementos = i;
            });
            this.materialService.BuscarMaterialesPorUsuario(this.usuario.Id).subscribe(m => {
                this.propuestas[1].elementos = m;
            });
            this.puntoService.getPuntoByUsuario(this.usuario.Id).subscribe(p => {
                this.propuestas[2].elementos = p;
            });
        });
    }
}
