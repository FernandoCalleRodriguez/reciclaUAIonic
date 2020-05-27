import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DudaService} from '../../shared/services/duda.service';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {Duda} from '../../shared/models/duda';
import {Respuesta} from '../../shared/models/respuesta';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, ToastController} from '@ionic/angular';
import {ConfiguracionService} from '../../shared/services/configuracion.service';
import {Tema} from '../../shared/models/tema';
import {TemaService} from '../../shared/services/tema.service';

@Component({
    selector: 'app-detalle-duda',
    templateUrl: './detalle-duda.page.html',
    styleUrls: ['./detalle-duda.page.scss'],
})
export class DetalleDudaPage implements OnInit {

    public duda: Duda = null;
    public respuestas: Respuesta[] = null;
    public usuario: Usuario = null;
    public formResponder: FormGroup;
    public maxlen: 1500;
    public tema: Tema = null;
    public esCuestion = false;
    public correctas: boolean = null;

    constructor(protected route: ActivatedRoute, protected dudaService: DudaService, protected toastController: ToastController,
                protected respuestaService: RespuestaService, protected  usuarioService: UsuarioService, protected temaService: TemaService,
                protected router: Router, protected config: ConfiguracionService, protected alertController: AlertController) {
        this.maxlen = 1500;
        this.esCuestion = false;
        this.correctas = false;
    }

    ionViewWillEnter() {
        const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.dudaService.getDudaById(id).subscribe(d => {
            this.duda = d;
            this.respuestaService.getRespuestasByDuda(this.duda.Id).subscribe(r => {
                this.respuestas = r;
            });
            this.tema = this.temaService.getTemaById(this.duda.Tema);
            this.esCuestion = this.tema.Tema === 'Cuestión';
            this.correctas = this.duda.ObtenerSiRespuestaValida;
        }, error => {
            this.config.presentToast('Error al obtener la duda ' + id, 'danger');
            this.router.navigate(['/foro']);
        });
    }

    ngOnInit() {
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
        });
        this.formResponder = new FormGroup({
            cuerpo: new FormControl(null, [Validators.required, Validators.maxLength(this.maxlen)])
        });
    }

    get cuerpo(): AbstractControl {
        return this.formResponder.get('cuerpo');
    }

    responder() {
        if (this.formResponder.valid) {
            const r: Respuesta = new Respuesta();
            r.Cuerpo = this.cuerpo.value;
            r.Duda_oid = this.duda.Id;
            r.Usuario_oid = this.usuario.Id;
            // console.log(r);
            this.respuestaService.crear(r).subscribe(data => {
                if (!this.respuestas) {
                    this.respuestas = [];
                }
                this.respuestas.push(data);
                this.cuerpo.reset();
                this.config.presentToast('Respuesta enviada', 'success');
            });
        }
    }

    async borrar(duda: Duda) {
        const alert = await this.alertController.create({
            header: 'Eliminar duda',
            message: '¿Estás seguro de que deseas eliminar la duda ' + duda.Id + '?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Sí',
                    handler: () => {
                        this.dudaService.borrar(duda).subscribe();
                        this.config.presentToast('Duda borrada', 'danger');
                        this.router.navigate(['/foro']);
                    }
                }
            ]
        });
        await alert.present();
    }

    async borrarRespuesta(respuesta: Respuesta) {
        const alert = await this.alertController.create({
            header: 'Eliminar respuesta',
            message: '¿Estás seguro de que deseas eliminar la respuesta ' + respuesta.Id + '?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Sí',
                    handler: () => {
                        this.respuestaService.borrar(respuesta).subscribe();
                        this.config.presentToast('Respuesta borrada', 'danger');
                        this.deleteRespuesta(respuesta);
                    }
                }
            ]
        });
        await alert.present();
    }

    pushRespuesta(respuesta: Respuesta) {
        if (!this.respuestas) {
            this.respuestas = [];
        }
        this.respuestas.push(respuesta);
    }

    deleteRespuesta(respuesta: Respuesta) {
        const index = this.respuestas.indexOf(respuesta);
        if (index > -1) {
            this.respuestas.splice(index, 1);
        }
    }

    marcarCorrecta(respuesta: Respuesta) {
        this.respuestaService.marcarCorrecta(respuesta.Id).subscribe(r => {
            respuesta.EsCorrecta = true;
            this.duda.ObtenerSiRespuestaValida = true;
            this.config.presentToast('Respuesta marcada como correcta', 'success');
        });
    }

    desmarcarCorrecta(respuesta: Respuesta) {
        this.respuestaService.desmarcarCorrecta(respuesta.Id).subscribe(r => {
            respuesta.EsCorrecta = false;
            let hayvalida = false;
            this.respuestas.forEach(res => {
                if (res.EsCorrecta) {
                    hayvalida = true;
                }
            });
            this.duda.ObtenerSiRespuestaValida = hayvalida;
            if (!hayvalida) {
                this.correctas = false;
            }
            this.config.presentToast('Respuesta desmarcada como correcta', 'success');
        });
    }
}
