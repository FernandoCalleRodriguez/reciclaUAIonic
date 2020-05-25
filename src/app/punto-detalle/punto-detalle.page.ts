import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PuntoService} from '../shared/services/punto.service';
import {Punto} from '../shared/models/punto';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';

@Component({
    selector: 'app-punto-detalle',
    templateUrl: './punto-detalle.page.html',
    styleUrls: ['./punto-detalle.page.scss'],
})
export class PuntoDetallePage implements OnInit {

    public punto: Punto = null;
    public id: number = null;

    @ViewChild(MapaPuntosComponent, {static: true})
    mapa: MapaPuntosComponent;

    constructor(protected route: ActivatedRoute, protected puntoService: PuntoService) {
    }

    ionViewWillEnter() {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    }

    ngOnInit() {
    }

    onMapReadyChange(ready: boolean) {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        if (ready) {
            this.puntoService.getPuntoById(this.id).subscribe(p => {
                this.punto = p;
                this.mapa.setUpMap([this.punto]);
            });
        }
    }
}
