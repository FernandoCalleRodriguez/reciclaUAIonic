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
import {Planta} from '../shared/models/planta';
import {Estancia} from '../shared/models/estancia';
import {MapaPickerComponent} from '../shared/components/mapa-picker/mapa-picker.component';
import {UsuarioService} from '../shared/services/usuario.service';
import {Nota} from '../shared/models/nota';
import {NotaService} from '../shared/services/nota.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    public idx = -1;
    public idxPlanta = -1;
    public selectedEstancia: Estancia = null;
    public notaInfo: Nota;

    @ViewChild(MapaEstanciasComponent)
    public mapa: MapaEstanciasComponent;

    @ViewChild(MapaPickerComponent)
    public picker: MapaPickerComponent;

    constructor(private menu: MenuController,
                private  autenticacionService: AutenticacionService,
                protected puntoService: PuntoService,
                protected edificioService: EdificioService,
                private usuarioService: UsuarioService,
                protected notaService: NotaService) {
        this.autenticacionService.estaAutenticado();
        // this.menu.open();
        this.usuarioService.getLoggedUser().subscribe(usuario => {
            this.autenticacionService.subject.next(usuario);
        });

        this.notaService.obtenerTodasNotas().subscribe(nota => {
            this.notaInfo = nota[nota.length - 1];
        });
    }

    ngOnInit() {
        this.idx = null;
        this.idxPlanta = null;
        this.selectedEstancia = null;
    }

    ionViewWillEnter() {
        this.autenticacionService.estaAutenticado();
    }
}
