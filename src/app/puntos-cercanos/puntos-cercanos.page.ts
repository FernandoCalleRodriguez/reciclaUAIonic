import {Component, OnInit, ViewChild} from '@angular/core';
import {Punto} from '../shared/models/punto';
import {PuntoService} from '../shared/services/punto.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';

@Component({
    selector: 'app-puntos-cercanos',
    templateUrl: './puntos-cercanos.page.html',
    styleUrls: ['./puntos-cercanos.page.scss'],
})
export class PuntosCercanosPage implements OnInit {

    public puntos: Punto[] = null;
    public ready: boolean = null;
    public limit: number = null;

    @ViewChild(MapaPuntosComponent, {static: true})
    mapa: MapaPuntosComponent;

    constructor(protected puntoService: PuntoService, protected geolocation: Geolocation) {
    }

    ngOnInit() {
        this.ready = null;
        this.limit = 10;
    }

    onMapReadyChange(ready: boolean) {
        if (ready) {
            this.ready = ready;
            this.getPuntosCercanos();
        }
    }

    getPuntosCercanos() {
        if (this.ready) {
            this.geolocation.getCurrentPosition().then((res) => {
                this.puntoService.BuscarPuntosCercanos(res.coords.latitude, res.coords.longitude, this.limit).subscribe(r => {
                    this.puntos = r;
                    this.mapa.setUpMap(this.puntos);
                });
            }).catch((error) => {
                this.puntos = null;
                console.log('Error getting location', error);
            });
        }
    }
}
