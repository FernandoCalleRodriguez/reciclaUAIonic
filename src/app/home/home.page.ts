import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {PuntoService} from '../shared/services/punto.service';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';

class Puntos {
}

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    public puntos: Puntos[] = null;

    constructor(private menu: MenuController,
                private  autenticacionService: AutenticacionService,
                protected puntoService: PuntoService) {
        this.autenticacionService.estaAutenticado();
        // this.menu.open();
        this.puntoService.getPunto().subscribe(p => {
            this.puntos = p;
        });
    }

    ngOnInit() {
    }

}
