import {Estancia} from './../shared/models/estancia';
import {ContenedorService} from './../shared/services/contenedor.service';
import {TipoContenedor, Contenedor} from './../shared/models/contenedor';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {TipoContenedorService} from 'src/app/shared/services/tipo-contenedor.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {AutenticacionService} from 'src/app/shared/services/autenticacion.service';
import {PuntoService} from 'src/app/shared/services/punto.service';
import {Punto} from '../shared/models/punto';
import {EstanciaService} from '../shared/services/estancia.service';
import {UsuarioService} from '../shared/services/usuario.service';
import {Usuario} from '../shared/models/usuario';
import {MapaPickerComponent} from '../shared/components/mapa-picker/mapa-picker.component';
import {LatLng} from 'leaflet';

@Component({
    selector: 'app-punto',
    templateUrl: './punto.page.html',
    styleUrls: ['./punto.page.scss'],
})
export class PuntoPage implements OnInit {
    puntoForm: FormGroup;
    punto: Punto;
    selectedContenedores: TipoContenedor[];
    contenedores: TipoContenedor[];
    contenedor: Contenedor;
    estancia: Estancia;
    usuario: Usuario = null;
    isEdit = false;
    editecContenedores: number[] = [];
    title = 'Crear punto';

    @ViewChild(MapaPickerComponent, {static: true})
    mapa: MapaPickerComponent;

    constructor(
        private activeRouter: ActivatedRoute,
        private contenedorService: ContenedorService,
        private puntoService: PuntoService,
        private estanciaService: EstanciaService,
        private tipoContenedores: TipoContenedorService,
        private router: Router,
        private toastController: ToastController,
        private autenticacionService: AutenticacionService,
        private usuarioService: UsuarioService) {
    }

    ngOnInit() {
        this.puntoForm = new FormGroup({
            Latitud: new FormControl(null, [Validators.required, Validators.min(-90), Validators.max(90)]),
            Longitud: new FormControl(null, [Validators.required, Validators.min(-90), Validators.max(90)]),
            Estancia_oid: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
            TipoContenedores: new FormArray([])
        });
        const id = this.activeRouter.snapshot.paramMap.get('id');
        if (id) {
            this.title = 'Modificar punto';
            const checkArray: FormArray = this.puntoForm.get('TipoContenedores') as FormArray;

            this.puntoService.getPuntoById(parseInt(id, 10)).subscribe(res => {
                this.punto = res;
                this.Latitud.setValue(res.Latitud);
                this.Longitud.setValue(res.Longitud);
                this.Estancia_oid.setValue(res.EstanciaPunto.Id);
                this.estancia = res.EstanciaPunto;
                res.Contenedores.forEach((c: Contenedor) => {
                    checkArray.controls.push(new FormControl(c.Tipo));
                });
                this.mapa.setZone(this.estancia.Latitud, this.estancia.Longitud);
            });
            this.usuarioService.getLoggedUser().subscribe(u => {
                this.usuario = u;
                this.contenedores = this.tipoContenedores.getTipos();
                this.contenedor = new Contenedor();
            });
            this.isEdit = true;
        } else {
            const estanciaId = this.activeRouter.snapshot.paramMap.get('idEstancia');
            this.isEdit = false;
            this.estanciaService.getEstanciaById(estanciaId).subscribe(e => {
                this.estancia = e;
                this.mapa.setZone(this.estancia.Latitud, this.estancia.Longitud);
            }, error => {
                this.presentToast('Estancia no encontrada', 'danger');
                this.router.navigate(['/punto/crear']);
            });
            this.usuarioService.getLoggedUser().subscribe(u => {
                this.usuario = u;
                this.contenedores = this.tipoContenedores.getTipos();
                this.punto = new Punto();
                this.contenedor = new Contenedor();
                this.Estancia_oid.setValue(estanciaId);
            });
        }
    }

    get Latitud() {
        return this.puntoForm.get('Latitud');
    }

    get Longitud() {
        return this.puntoForm.get('Longitud');
    }

    get Estancia_oid() {
        return this.puntoForm.get('Estancia_oid');
    }

    get TipoContenedores() {
        return this.puntoForm.get('TipoContenedores');
    }

    createPunto() {
        const id = parseInt(this.activeRouter.snapshot.paramMap.get('id'), 10);

        this.punto.Latitud = this.puntoForm.value.Latitud;
        this.punto.Longitud = this.puntoForm.value.Longitud;
        this.punto.Usuario_oid = this.usuario.Id;
        this.punto.Estancia_oid = this.puntoForm.value.Estancia_oid;
        if (this.isEdit) {
            this.punto.Id = id;
            this.puntoService.updatePunto(this.punto).subscribe(res => {
                res.Contenedores.forEach(c => {
                    this.contenedorService.removeContenedor(c.Id).subscribe();
                });
                const checkArray: FormArray = this.puntoForm.get('TipoContenedores') as FormArray;

                checkArray.controls.forEach((c: any) => {
                    this.contenedor.Punto_oid = res.Id;
                    this.contenedor.Tipo = c.value;
                    this.contenedorService.setContenedor(this.contenedor).subscribe(result => {
                    });
                });
            });
            this.presentToast('Punto editado', 'success');
        } else {
            this.punto.Latitud = this.puntoForm.value.Latitud;
            this.punto.Longitud = this.puntoForm.value.Longitud;
            this.punto.Usuario_oid = this.usuario.Id;
            this.punto.Estancia_oid = this.puntoForm.value.Estancia_oid;

            this.puntoService.setPunto(this.punto).subscribe(res => {
                const checkArray: FormArray = this.puntoForm.get('TipoContenedores') as FormArray;
                checkArray.controls.forEach((c: any) => {
                    this.contenedor.Punto_oid = res.Id;
                    this.contenedor.Tipo = c;
                    this.contenedorService.setContenedor(this.contenedor).subscribe(result => {
                        this.presentToast('creados', 'success');
                    });
                });

            });
            this.presentToast('Punto creado', 'success');
        }
        this.isEdit = false;
        this.router.navigate(['/usuario/propuestas']);

    }

    async presentToast(messagetext, color) {
        const toast = await this.toastController.create({
            message: messagetext,
            duration: 2000,
            color: color

        });
        toast.present();
    }

    onCheckboxChange(e) {
        const checkArray: FormArray = this.puntoForm.get('TipoContenedores') as FormArray;

        if (e.target.checked) {
            if (!checkArray.controls.some(c => c.value == e.target.value)) {
                checkArray.push(new FormControl(e.target.value));
                this.editecContenedores.push(e.target.value);
            }
        } else {
            let i: number = 0;
            checkArray.controls.forEach((item: FormControl) => {
                if (item.value == e.target.value) {
                    var index = checkArray.controls.indexOf(item);
                    checkArray.removeAt(index);
                    return;
                }
                i++;
            });
        }

    }

    checkIfOk(checkbox) {
        return this.punto?.Contenedores?.some(c => c.Tipo == checkbox.value);
    }

    ionViewWillEnter() {
        this.ngOnInit();
    }

    coordinatesChange(coordenadas: LatLng) {
        this.Latitud.setValue(coordenadas.lat);
        this.Longitud.setValue(coordenadas.lng);
    }

    latlngChange() {
        this.mapa.setMarker(new LatLng(this.Latitud.value, this.Longitud.value), false);
    }
}
