import { Material } from './../../shared/models/material';
import { Component, OnInit } from '@angular/core';
import { Item } from '../../shared/models/item';
import { ItemService } from '../../shared/services/item.service';
import { MaterialService } from '../../shared/services/materiel.service';
import { PuntoService } from '../../shared/services/punto.service';
import { ValidacionService } from '../../shared/services/validacion.service';
import { Estado } from '../../shared/models/estado';
import { UsuarioService } from '../../shared/services/usuario.service';
import { Usuario } from '../../shared/models/usuario';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-propuestas-usuario',
    templateUrl: './propuestas-usuario.page.html',
    styleUrls: ['./propuestas-usuario.page.scss'],
})
export class PropuestasUsuarioPage implements OnInit {
    materialCopy: Material[];
    itemCopy: Item[];
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

    constructor(
        private alertController: AlertController,
        protected itemService: ItemService, protected materialService: MaterialService, protected puntoService: PuntoService,
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
                this.itemCopy = i;
            });
            this.materialService.BuscarMaterialesPorUsuario(this.usuario.Id).subscribe(m => {
                    this.propuestas[1].elementos = m;
                    this.materialCopy = m;
            });
            this.puntoService.getPuntoByUsuario(this.usuario.Id).subscribe(p => {
                this.propuestas[2].elementos = p;
            });
        });
    }
    delete(item, obj) {
        this.presentAlertMultipleButtons(item, obj)
    }
    async presentAlertMultipleButtons(item, obj) {
        const alert = await this.alertController.create({
            header: 'Borrar ' + item.Nombre,
            message: 'Estas seguro que quieres borrar'+item.Nombre,
            buttons: ['Cancel', {
                text: 'Borrar',
                cssClass: 'danger',
                handler: (blah) => {

                    if (obj == 0) {
                        this.itemService.removeItem(item.Id).subscribe(res => {

                            var index = this.propuestas[0].elementos.indexOf(item);
                            if (index > -1)
                                this.propuestas[0].elementos.splice(index, 1)
                        })
                    } else if (obj == 1) {
                        this.materialService.removeMaterial(item.Id).subscribe(res => {

                            var index = this.propuestas[1].elementos.indexOf(item);
                            if (index > -1)
                                this.propuestas[1].elementos.splice(index, 1)
                        })
                    }
                }
            }]
        });

        await alert.present();
    }
    buscar(e, obj) {
        var value = e.detail.value.toLowerCase();
        if (obj == 0) {
            this.propuestas[obj].elementos = this.itemCopy;
            this.propuestas[obj].elementos = this.propuestas[obj].elementos.filter(i => i.Nombre.trim().toLowerCase().includes(value.trim()))
        } else if (obj == 1) {
            this.propuestas[1].elementos = this.materialCopy;
            this.propuestas[obj].elementos = this.propuestas[obj].elementos.filter(i => i.Nombre.trim().toLowerCase().includes(value.trim()))
        }


    }
    ionViewWillEnter(){
        this.ngOnInit();
     }
}
