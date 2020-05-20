import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AutenticacionService} from './shared/services/autenticacion.service';
import {UsuarioService} from './shared/services/usuario.service';
import {Usuario} from './shared/models/usuario';
import {NotaService} from './shared/services/nota.service';
import {Nota} from './shared/models/nota';

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
            url: '/foro',
            icon: 'list'
        },
        {
            title: 'Juego',
            url: '/home',
            icon: 'trophy'
        },
        {
            title: 'Notas informativas',
            url: '/notainfo',
            icon: 'reader',
            count: 0
        },
    ];
    usuario: Usuario;
    notificacionesNotas = 0;
    notas: Nota[];
    notasS: Nota[];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public autenticacionService: AutenticacionService,
        private usuarioService: UsuarioService,
        private notaService: NotaService
    ) {
        this.initializeApp();
        this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(u => {
            this.usuario = u;
        }, error => {
            this.autenticacionService.Logout();
        });
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
        this.notify();
    }

    notify() {
        if (this.autenticacionService.isLogged()) {
            this.notaService.obtenerTodasNotas().subscribe(res => {
                this.notaService.obtenerNotasStorage().then(res2 => {
                    this.notas = res;
                    this.notasS = res2;
                    if (this.notasS != null && this.notas != null) {
                        this.notificacionesNotas = this.notas.length - this.notasS.length;
                        this.appPages[2].count = this.notificacionesNotas;
                    } else {
                        this.notificacionesNotas = this.notas.length;
                        this.appPages[2].count = this.notificacionesNotas;
                    }
                });
            });
        }
    }

    ionViewWillEnter() {
        this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(u => {
            console.log("prueba");
            this.usuario = u;
        }, error => {
            this.autenticacionService.Logout();
        });
    }
}
