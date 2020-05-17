import {Component, OnInit} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AutenticacionService} from '../shared/services/autenticacion.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    constructor(private menu: MenuController,
                private  autenticacionService: AutenticacionService) {
        this.autenticacionService.estaAutenticado();
        //this.menu.open();
    }

    ngOnInit() {
    }

}
