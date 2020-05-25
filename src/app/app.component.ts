import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AutenticacionService} from './shared/services/autenticacion.service';
import {UsuarioService} from './shared/services/usuario.service';
import {Usuario} from './shared/models/usuario';
import {NotaService} from './shared/services/nota.service';
import {Nota} from './shared/models/nota';
import {from, Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public appPages = [
        {
          title: 'Inicio',
          url: '/home',
          icon: 'home'
        },
        {
            title: 'Foro',
            url: '/foro',
            icon: 'list'
        },
        {
            title: 'Juego',
            url: '/juego',
            icon: 'trophy'
        },
        {
            title: 'Notas infor.',
            url: '/notainfo',
            icon: 'reader',
            count: 0
        },
        {
            title: 'Propuestas',
            url: '/usuario/propuestas',
            icon: 'hourglass',
            count: 0
        },
        {
            title: 'Sobre nosotros',
            url: '/aboutus',
            icon: 'information'
        }
    ];
    usuario: Usuario;
    nNotificacionesNotas$: Observable<number>;
    notas: Nota[];
    notasS: Nota[];
    nNotificacionesNotas: number;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public autenticacionService: AutenticacionService,
        private usuarioService: UsuarioService,
        private notaService: NotaService,
    ) {
        this.initializeApp();
        this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(u => {
            this.usuario = u;
        }, error => {
            this.autenticacionService.Logout();
        });

        this.autenticacionService.subject.subscribe(u => {
            this.usuario = u;
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {
        this.notaService.actualizarNotificacionesNotas(0);
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }
        this.notify();
        this.nNotificacionesNotas$ = this.notaService.obtenerCantidadNotasNoLeidas();
        this.nNotificacionesNotas$.subscribe( n => this.appPages[2].count = n);
    }

    notify() {
        if (this.autenticacionService.isLogged()) {
            this.notaService.obtenerTodasNotas().subscribe(res => {
                this.notaService.obtenerNotasStorage().then(res2 => {
                    this.notas = res;
                    this.notasS = res2;
                    if (this.notasS != null && this.notas != null) {
                        this.nNotificacionesNotas = this.notas.length - this.notasS.length;
                        this.appPages[2].count = this.nNotificacionesNotas;
                        this.notaService.actualizarNotificacionesNotas(this.nNotificacionesNotas);
                    } else {
                        this.nNotificacionesNotas = this.notas.length;
                        this.appPages[2].count = this.nNotificacionesNotas;
                        this.notaService.actualizarNotificacionesNotas(this.nNotificacionesNotas);
                    }
                });
            });
        }
    }

    ionViewWillEnter() {
        // this.notify();
        this.usuarioService.obtenerUsuarioPorId(this.autenticacionService.getID(), 'web').subscribe(u => {
            console.log('prueba');
            this.usuario = u;
        }, error => {
            this.autenticacionService.Logout();
        });
    }
}
