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
import {ToastController} from '@ionic/angular';

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

    constructor(protected route: ActivatedRoute, protected dudaService: DudaService, protected toastController: ToastController,
                protected respuestaService: RespuestaService, protected  usuarioService: UsuarioService,
                protected router: Router) {
        this.maxlen = 1500;
    }

    ionViewWillEnter() {
        const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.dudaService.getDudaById(id).subscribe(d => {
            this.duda = d;
            this.respuestaService.getRespuestasByDuda(this.duda.Id).subscribe(r => {
                this.respuestas = r;
            });
        }, error => {
            this.presentToast('Error al obtener la duda ' + id, 'danger');
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
            console.log(r);
            this.respuestaService.crear(r).subscribe(data => {
                if (!this.respuestas) {
                    this.respuestas = [];
                }
                this.respuestas.push(data);
                this.cuerpo.reset();
                this.presentToast('Respuesta enviada', 'success');
            });
        }
    }

    borrar(duda: Duda) {

    }

    async presentToast(messagetext, color) {
        const toast = await this.toastController.create({
            message: messagetext,
            duration: 2000,
            color: color

        });
        toast.present();
    }

    pushRespuesta(respuesta: Respuesta) {
        if (!this.respuestas) {
            this.respuestas = [];
        }
        this.respuestas.push(respuesta);
    }
}
