import {Router, NavigationExtras} from '@angular/router';
import {TipoContenedorService} from '../../shared/services/tipo-contenedor.service';
import {ValidacionService} from '../../shared/services/validacion.service';
import {Item} from '../../shared/models/item';
import {AutenticacionService} from 'src/app/shared/services/autenticacion.service';
import {ItemService} from '../../shared/services/item.service';
import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.page.html',
    styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
    imgs: string[];
    items: Item[] = [];
    itemsCopy: Item[] = [];
    userId: number;
    public term = null;

    constructor(private alertController: AlertController,
                private tipoContenedorService: TipoContenedorService,
                private validacionService: ValidacionService,
                private itemService: ItemService,
                private autenticacionService: AutenticacionService,
                private router: Router,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.imgs = [];
        this.itemService.getItems().subscribe(res => {
            res.forEach((item, index) => {
                if (item.EsValido == 1) {
                    this.items.push(item);
                    this.itemsCopy.push(item);
                    this.imgs.push('');
                    this.itemService.GetImage(item.Id, item.Imagen).subscribe(res => {
                        if (res != null) {
                            this.imgs[index] = 'data:image/bmp;base64,' + res;
                        } else {
                            this.imgs[index] = '';
                        }
                    });
                }

            });
        });


    }

    getItemImage(i) {
        return this.imgs[i];
    }

    getEstado(id) {
        return this.validacionService.getEstadoById(id).Estado;
    }

    getTipo(id) {
        if (id == null) {
            return;
        }
        return this.tipoContenedorService.getTipoById(id).Tipo;
    }

    buscarItem(e: any) {
        this.term = e.target.value;
        this.items = this.itemsCopy;
        const t = this.term.toLowerCase();
        if (t != '') {
            const tparts = t.split(' ').filter(e => {
                return e != '';
            });
            this.items = this.items.filter(item => {
                let exists = true;
                const name = item.Nombre.toLowerCase();
                const description = item.Descripcion.toLowerCase();
                for (const part of tparts) {
                    if (!name.includes(part) && !description.includes(part)) {
                        exists = false;
                    }
                }
                return exists;
            });
        } else {
            this.term = null;
        }
    }

    delete(item) {
        this.presentAlertMultipleButtons(item);
    }

    async presentAlertMultipleButtons(item) {
        const alert = await this.alertController.create({
            header: 'Borrar item ' + item.Nombre,
            message: 'Estas seguro que quieres borrar este item',
            buttons: ['Cancel', {
                text: 'Borrar',
                cssClass: 'danger',
                handler: (blah) => {
                    this.itemService.removeItem(item.Id).subscribe(res => {

                        var index = this.items.indexOf(item);
                        if (index > -1) {
                            this.items.splice(index, 1);
                        }
                    });
                }
            }]
        });

        await alert.present();
    }

    setItemTorecycle(item) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                itemId: item.Id
            }
        };
        this.navCtrl.navigateForward(['/donde-reciclar'], navigationExtras);

    }
}
