import {Component, OnInit, ViewChild} from '@angular/core';
import {Edificio} from '../shared/models/edificio';
import {Estancia} from '../shared/models/estancia';
import {MapaEstanciasComponent} from '../shared/components/mapa-estancias/mapa-estancias.component';
import {MenuController} from '@ionic/angular';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {EdificioService} from '../shared/services/edificio.service';
import {Planta} from '../shared/models/planta';
import {EstanciaService} from '../shared/services/estancia.service';

@Component({
    selector: 'app-seleccion-estancia-punto',
    templateUrl: './seleccion-estancia-punto.page.html',
    styleUrls: ['./seleccion-estancia-punto.page.scss'],
})
export class SeleccionEstanciaPuntoPage implements OnInit {

    public edificios: Edificio[] = null;
    public idxEdificio = -1;
    public idxPlanta = -1;
    public selectedEstancia: Estancia = null;
    public estancias: Estancia[] = null;
    public selectedEstanciaId: string = null;

    @ViewChild(MapaEstanciasComponent)
    public mapaEstancias: MapaEstanciasComponent;

    public edificioAlertOpts: any = {
        header: 'Listado de edificios',
        cssClass: 'larger-alert'
    };

    public plantaAlertOpts: any = {
        header: 'Listado de plantas',
    };


    constructor(private menu: MenuController,
                private  autenticacionService: AutenticacionService,
                protected edificioService: EdificioService, protected estanciaService: EstanciaService) {
        this.autenticacionService.estaAutenticado();
        this.edificioService.getEdificio().subscribe(e => {
            this.edificios = e;
        });
    }

    ngOnInit() {
        this.idxEdificio = null;
        this.idxPlanta = null;
        this.selectedEstancia = null;
        this.selectedEstanciaId = null;
        this.estancias = null;
    }

    changeEdificio(idxEdificio: number) {
        this.idxPlanta = null;
        this.selectedEstancia = null;
        this.selectedEstanciaId = null;
        this.getEstancias();
        this.mapaEstancias.setUpMap(this.edificios[idxEdificio], this.idxPlanta);
    }

    changePlanta(idxPlanta: any) {
        this.selectedEstancia = null;
        this.selectedEstanciaId = null;
        this.getEstancias();
        this.mapaEstancias.setUpMap(this.edificios[this.idxEdificio], idxPlanta);
    }

    getEstancias() {
        // console.log('No filter: ', this.estancias);
        this.estanciaService.getEstanciasByEdificio(this.edificios[this.idxEdificio].Id).subscribe(e => {
            this.estancias = e;
            if (this.idxPlanta && this.estancias && this.estancias.length > 0) {
                this.estancias = this.estancias.filter(estancia => {
                    return estancia.PlantaEstancia.Planta == this.idxPlanta;
                });
            }
            // console.log('Filter: ', this.estancias);
        });
    }

    sortedPlantas(plantas: Planta[]) {
        return plantas.sort((a, b) => {
            return a.Planta - b.Planta;
        });
    }

    onEstanciaChange(estancia: Estancia) {
        // console.log(estancia);
        this.selectedEstancia = estancia;
        this.selectedEstanciaId = estancia.Id;
    }

    changeEstancia(id: string) {
        // console.log(id);
        this.mapaEstancias.setActualMarker(id);
    }
}
