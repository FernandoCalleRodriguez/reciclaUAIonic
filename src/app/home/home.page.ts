import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {PuntoService} from '../shared/services/punto.service';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';
import {Edificio} from '../shared/models/edificio';
import {EdificioService} from '../shared/services/edificio.service';
import {MapaEstanciasComponent} from '../shared/components/mapa-estancias/mapa-estancias.component';

class Puntos {
}

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    public puntos: Puntos[] = null;
    public edificios: Edificio[] = null;
    public idx = 0;

    @ViewChild(MapaEstanciasComponent)
    public mapa: MapaEstanciasComponent;
    alertOpts: any = {
        header: 'Listado de edificios',
        cssClass: 'larger-alert'
    };

    constructor(private menu: MenuController,
                private  autenticacionService: AutenticacionService,
                protected puntoService: PuntoService,
                protected edificioService: EdificioService) {
        this.autenticacionService.estaAutenticado();
        // this.menu.open();
        this.puntoService.getPunto().subscribe(p => {
            this.puntos = p;
        });
        this.edificioService.getEdificio().subscribe(e => {
            this.edificios = e;
        });
    }

    ngOnInit() {
    }

    changeEdificio(idx: number) {
        console.log(idx);
        this.mapa.setUpMap(this.edificios[idx]);
    }
}
