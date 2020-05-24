import {Component, OnInit, ViewChild} from '@angular/core';
import {MapaPuntosComponent} from '../shared/components/mapa-puntos/mapa-puntos.component';
import {ItemService} from '../shared/services/item.service';
import {PuntoService} from '../shared/services/punto.service';
import {Punto} from '../shared/models/punto';
import {Contenedor} from '../shared/models/contenedor';
import {Item} from '../shared/models/item';
import {EstadoEnum} from '../shared/models/estado';
import {Edificio} from '../shared/models/edificio';
import {Estancia} from '../shared/models/estancia';
import {MapaEstanciasComponent} from '../shared/components/mapa-estancias/mapa-estancias.component';
import {Planta} from '../shared/models/planta';
import {EdificioService} from '../shared/services/edificio.service';
import {AlertController} from '@ionic/angular';
import {Usuario} from '../shared/models/usuario';
import {UsuarioService} from '../shared/services/usuario.service';
import {AccionreciclarService} from '../shared/services/accionreciclar.service';
import {AccionReciclar} from '../shared/models/accion';
import {ConfiguracionService} from '../shared/services/configuracion.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-accion-reciclar',
    templateUrl: './accion-reciclar.page.html',
    styleUrls: ['./accion-reciclar.page.scss'],
})
export class AccionReciclarPage implements OnInit {

    @ViewChild(MapaPuntosComponent, {static: true})
    public mapaPuntosComponent: MapaPuntosComponent;

    public items: Item[] = null;
    public fitems: Item[] = null;
    public puntos: Punto[] = null;
    public selectedPunto: Punto = null;
    public contenedores: Contenedor[] = null;
    public term: string = null;
    public EstadoEnum: typeof EstadoEnum = EstadoEnum;

    public edificios: Edificio[] = null;
    public idxEdificio = -1;
    public idxPlanta = -1;

    public selectedContenedor: Contenedor = null;
    public selectedItem: Item = null;
    public cantidad: number = null;
    public usuario: Usuario = null;
    public idItem: number = null;
    public idContenedor: number = null;

    public edificioAlertOpts: any = {
        header: 'Listado de edificios',
        cssClass: 'larger-alert'
    };

    public plantaAlertOpts: any = {
        header: 'Listado de plantas',
    };

    constructor(protected itemService: ItemService, protected puntoService: PuntoService, protected usuarioService: UsuarioService,
                protected edificioService: EdificioService, protected alertCtrl: AlertController,
                protected accionReciclar: AccionreciclarService, protected config: ConfiguracionService,
                protected router: Router) {
        this.edificioService.getEdificio().subscribe(e => {
            this.edificios = e;
        });
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
        });
    }

    ngOnInit() {
        this.selectedContenedor = null;
        this.selectedItem = null;
        this.contenedores = null;
        this.term = null;
        this.idxEdificio = null;
        this.idxPlanta = null;
        this.cantidad = null;
        this.itemService.getItems().subscribe(i => {
            this.items = i;
            this.items.sort((a, b) => {
                return a.EsValido - b.EsValido || a.Nombre.localeCompare(b.Nombre);
            });
        });
    }

    onMapReady(ready: boolean) {
        if (ready) {
            this.puntoService.getPunto().subscribe(p => {
                this.puntos = p;
                this.mapaPuntosComponent.setUpMap(this.puntos);
            });
        }
    }

    onPuntoChange(punto: Punto) {
        this.contenedores = null;
        this.idContenedor = -1;
        this.selectedContenedor = null;
        this.contenedores = punto.Contenedores;
    }

    filterItems(event: any) {
        this.term = event.target.value;
        const t = this.term.toLowerCase();
        if (t != '') {
            const tparts = t.split(' ').filter(e => {
                return e != '';
            });
            this.fitems = this.items.filter(item => {
                let exists = true;
                const name = item.Nombre.toLowerCase();
                const description = item.Descripcion.toLowerCase();
                for (const part of tparts) {
                    if (!(name.includes(part) || description.includes(t))) {
                        exists = false;
                    }
                }
                return exists;
            });
        } else {
            this.term = null;
            this.fitems = null;
        }
    }

    sortedPlantas(plantas: Planta[]) {
        return plantas.sort((a, b) => {
            return a.Planta - b.Planta;
        });
    }

    changeEdificio(idxEdificio: number) {
        this.contenedores = null;
        this.selectedContenedor = null;
        this.idxPlanta = null;
        this.puntoService.getPuntoByEdificio(this.edificios[this.idxEdificio].Id).subscribe(p => {
            this.puntos = p;
            this.mapaPuntosComponent.setUpMap(this.puntos);
        });
    }

    changePlanta(planta: number) {
        this.selectedContenedor = null;
        this.contenedores = null;
        this.idContenedor = -1;
        this.selectedContenedor = null;
        this.puntoService.getPuntoByPlanta(planta, this.edificios[this.idxEdificio].Id).subscribe(p => {
            this.puntos = p;
            this.mapaPuntosComponent.setUpMap(this.puntos);
        });
    }

    cantidadPrompt() {
        const alert = this.alertCtrl.create({
            header: 'Cantidad',
            message: '',
            inputs: [
                {
                    name: 'cantidad',
                    placeholder: 'Cantidad reciclada',
                    type: 'number',
                    min: '1',
                    value: this.cantidad
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        if (!(this.cantidad && !isNaN(this.cantidad) || this.cantidad > 1)) {
                            this.cantidad = null;
                            this.selectedItem = null;
                            this.idItem = -1;
                        }
                    }
                },
                {
                    text: 'Aceptar',
                    handler: data => {
                        const c = parseInt(data.cantidad, 10);
                        if (isNaN(c) || c < 1) {
                            alert.then(a => {
                                a.setAttribute('message', 'Número inválido');
                            });
                            return false;
                        }
                        this.cantidad = c;
                        this.selectedItem = this.items.find(i => {
                            return i.Id == this.idItem;
                        });
                        return true;
                    }
                }
            ]
        });
        alert.then(a => {
            a.present();
        });
    }

    get canCreate() {
        return this.cantidad && this.selectedItem && this.selectedContenedor && this.usuario;
    }

    changeContenedor(id: number) {
        this.selectedContenedor = this.contenedores.find(c => {
            return c.Id == id;
        });
    }

    reciclar() {
        if (this.canCreate) {
            const accion = new AccionReciclar();
            accion.Item_oid = this.idItem;
            accion.Contenedor_oid = this.idContenedor;
            accion.Usuario_oid = this.usuario.Id;
            accion.Cantidad = this.cantidad;

            this.accionReciclar.crear(accion).subscribe(a => {
                this.config.presentToast('¡Gracias por reciclar! '
                    + a.Cantidad * a.ItemAccion.Puntuacion + ' puntos conseguidos.', 'success');
                this.router.navigate(['/home']);
            });
        }
    }
}
