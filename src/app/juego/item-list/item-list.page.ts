import { TipoContenedorService } from './../../shared/services/tipo-contenedor.service';
import { ValidacionService } from './../../shared/services/validacion.service';
import { Item } from './../../shared/models/item';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { ItemService } from './../../shared/services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  imgs: string[];
  items: Item[];
  constructor(private tipoContenedorService:TipoContenedorService,private validacionService:ValidacionService,private itemService: ItemService, private autenticacionService: AutenticacionService) { }

  ngOnInit() {
    this.imgs = [];
    let userId = (parseInt(this.autenticacionService.getID()) != -1) ? parseInt(this.autenticacionService.getID()) : 65537
    this.itemService.getByUserId(userId).subscribe(res => {
    this.items = res;
      this.items.forEach(item => {
        this.itemService.GetImage(item.Id, item.Imagen).subscribe(res => {
          this.imgs.push('data:image/bmp;base64,' + res);
        }
        )
      });
    })


  }
  getItemImage(i) {
     return this.imgs[i];
  }
  getEstado(id){
    return this.validacionService.getEstadoById(id).Estado
  }
  getTipo(id){
    return this.tipoContenedorService.getTipoById(id).Tipo
  }
}
