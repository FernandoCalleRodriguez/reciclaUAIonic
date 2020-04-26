import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AutenticacionService} from './shared/services/autenticacion.service';
import {UsuarioService} from './shared/services/usuario.service';
import {Usuario} from './shared/models/usuario';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'Foro',
            url: '/home',
            icon: 'list'
        },
        {
            title: 'Juego',
            url: '/home',
            icon: 'trophy'
        },
        {
            title: 'Notas informativas',
            url: '/home',
            icon: 'reader'
        },
    ];
    usuario: Usuario;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private autenticacionService: AutenticacionService,
        private usuarioService: UsuarioService,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }

        if (this.autenticacionService.isLogged()) {
            this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(result => {
                this.usuario = result;
            });
        }
    }
}
