import {Router, NavigationExtras} from '@angular/router';
import {AutenticacionService} from 'src/app/shared/services/autenticacion.service';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';
import {Material} from '../../shared/models/material';
import {MaterialService} from 'src/app/shared/services/materiel.service';
import {Component, OnInit} from '@angular/core';
import {ValidacionService} from 'src/app/shared/services/validacion.service';
import {AlertController, NavController} from '@ionic/angular';
import {Route} from '@angular/compiler/src/core';

@Component({
    selector: 'app-material-list',
    templateUrl: './material-list.page.html',
    styleUrls: ['./material-list.page.scss'],
})
export class MaterialListPage implements OnInit {

    constructor(
        private route: Router,
        private alertController: AlertController,
        private materialService: MaterialService,
        private autenticacionService: AutenticacionService,
        private tipoContenedorService: TipoContenedorService,
        private validacionService: ValidacionService,
        private navCtrl: NavController) {
    }

    materiales: Material[] = [];
    materialesCopy: Material[] = [];

    ngOnInit() {
        this.materialService.getMaterial().subscribe(res => {
            res.forEach(item => {
                if (item.EsValido == 1) {
                    this.materiales.push(item);
                    this.materialesCopy.push(item);
                }
            });
        });
    }

    getTipo(id) {
        return this.tipoContenedorService.getTipoById(id).Tipo;
    }

    getEstado(id) {
        return this.validacionService.getEstadoById(id).Estado;
    }

    buscarMaterial(e) {
        var value = e.detail.value.toLowerCase();
        this.materiales = this.materialesCopy;
        this.materiales = this.materiales.filter(i => i.Nombre.trim().toLowerCase().includes(value.trim()));
    }

    edit(material) {
        this.route.navigate(['/material'], {
            queryParams: {id: material.Id}
        });
    }

    delete(material) {
        this.presentAlertMultipleButtons(material);
    }

    async presentAlertMultipleButtons(material) {
        const alert = await this.alertController.create({
            header: 'Borrar material ' + material.Nombre,
            message: 'Estas seguro que quieres borrar este material',
            buttons: ['Cancelar', {
                text: 'Borrar',
                cssClass: 'danger',
                handler: (blah) => {
                    this.materialService.removeMaterial(material.Id).subscribe(res => {

                        var index = this.materialesCopy.indexOf(material);
                        if (index > -1) {
                            this.materiales.splice(index, 1);
                        }
                    });
                }
            }]
        });

        await alert.present();
    }

    setMaterialTorecycle(material) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                materialId: material.Id
            }
        };
        this.navCtrl.navigateForward(['donde-reciclar'], navigationExtras);
    }
}
