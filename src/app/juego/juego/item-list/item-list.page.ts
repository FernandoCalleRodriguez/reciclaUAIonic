import { TipoContenedorService } from '../../../shared/services/tipo-contenedor.service';
import { ValidacionService } from '../../../shared/services/validacion.service';
import { Item } from '../../../shared/models/item';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { ItemService } from '../../../shared/services/item.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  imgs: string[];
  items: Item[];
  itemsCopy: Item[];
  userId: number;
  constructor(private alertController: AlertController, private tipoContenedorService: TipoContenedorService, private validacionService: ValidacionService, private itemService: ItemService, private autenticacionService: AutenticacionService) { }

  ngOnInit() {
    this.imgs = [];
    this.userId = parseInt(this.autenticacionService.getID())
    this.itemService.getByUserId(this.userId).subscribe(res => {
      this.items = res;
      this.itemsCopy = res;
      this.items.forEach(item => {
        this.itemService.GetImage(item.Id, item.Imagen).subscribe(res => {
          if (res != null) {
            this.imgs.push('data:image/bmp;base64,' + res);
          } else {
            this.imgs.push("");

          }
        }
        )
      });
    })


  }
  getItemImage(i) {
    return this.imgs[i];
  }
  getEstado(id) {
    return this.validacionService.getEstadoById(id).Estado
  }
  getTipo(id) {
    if (id == null) return;
    return this.tipoContenedorService.getTipoById(id).Tipo
  }
  buscarItem(e) {
    var value = e.detail.value.toLowerCase();
    this.items = this.itemsCopy;
    this.items = this.items.filter(i => i.Nombre.toLowerCase().includes(value) || i.Descripcion.toLowerCase().includes(value) || i.MaterialItem.Nombre.toLowerCase().includes(value))


  }
  delete(item) {
    this.presentAlertMultipleButtons(item)
  }

  async presentAlertMultipleButtons(item) {
    const alert = await this.alertController.create({
      header: 'Borrar item '+item.Nombre,
      message: 'Estas seguro que quieres borrar este item',
      buttons: ['Cancel', {
        text: 'Borrar',
        cssClass: 'danger',
        handler: (blah) => {
          this.itemService.removeItem(item.Id).subscribe(res => {

            var index = this.items.indexOf(item);
            if (index > -1)
              this.items.splice(index, 1)
          })
        }
      }]
    });

    await alert.present();
  }

}