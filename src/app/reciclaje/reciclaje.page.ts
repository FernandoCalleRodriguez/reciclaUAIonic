import {TipoContenedorService} from './../shared/services/tipo-contenedor.service';
import {PuntoService} from 'src/app/shared/services/punto.service';
import {MaterialService} from 'src/app/shared/services/materiel.service';
import {Material} from './../shared/models/material';
import {Item} from './../shared/models/item';
import {ItemService} from 'src/app/shared/services/item.service';
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Punto} from '../shared/models/punto';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';

@Component({
    selector: 'app-reciclaje',
    templateUrl: './reciclaje.page.html',
    styleUrls: ['./reciclaje.page.scss'],
})
export class ReciclajePage implements OnInit {
    itemSelected = false;
    materialSelected = false;
    selectedItem: Item = null;
    selectedMaterial: Material = null;
    puntosCercanos: Punto[] = null;
    limit: number = 2;

    @ViewChild(MapaPuntosComponent, {static: true})
    mapa: MapaPuntosComponent;

    constructor(
        private tipoContenedorService: TipoContenedorService,
        private puntoService: PuntoService,
        private geolocation: Geolocation,
        private router: ActivatedRoute,
        private itemSerice: ItemService,
        private materialService: MaterialService) {
    }

    ngOnInit() {
        const itemId = this.router.snapshot.queryParamMap.get('itemId');
        if (itemId != null) {
            this.itemSerice.getById(parseInt(itemId, 10)).subscribe(res => {
                if (res != null) {
                    this.selectedItem = res;
                    this.selectedMaterial = res.MaterialItem;
                    this.itemSelected = true;
                    this.materialSelected = true;
                }
            });
        }

        const materialId = this.router.snapshot.queryParamMap.get('materialId');
        if (materialId != null) {
            this.materialService.getMaterialById(parseInt(materialId, 10)).subscribe(res => {
                if (res != null) {
                    this.selectedMaterial = res;
                    this.materialSelected = true;
                    this.itemSelected = false;
                    this.selectedItem = null;
                }
            });
        }
    }

    getPuntosCercanos() {
        this.geolocation.getCurrentPosition().then((res) => {
            // console.log(res)
            if (this.limit < 0) {
                this.limit = 2;
            }
            this.puntoService.BuscarPuntosCercanos(res.coords.latitude, res.coords.longitude, this.limit).subscribe(r => {
                console.log(r);
            });
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    getPuntosCercanosPorContenedor() {
        if (this.selectedMaterial == null) {
            return;
        }
        this.geolocation.getCurrentPosition().then((res) => {
            // console.log(res.coords.latitude, res.coords.longitude);
            // console.log(this.limit);
            if (this.limit < 0) {
                this.limit = 2;
            }
            this.puntoService.BuscarPuntosCercanosPorContenedor(res.coords.latitude, res.coords.longitude, this.limit, this.selectedMaterial.Contenedor).subscribe(r => {
                this.puntosCercanos = r;
                this.mapa.setUpMap(r);
                // console.log(r);
            });
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    changeRange(valor) {
        this.limit = valor.detail.value;
    }

    getType(id) {
        return this.tipoContenedorService.getTipoById(id).Tipo;
    }

    ionViewWillEnter() {
        this.ngOnInit();
    }
}
