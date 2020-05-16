import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../shared/models/usuario';
import {ActivatedRoute, Router} from '@angular/router';
import {DudaService} from '../../shared/services/duda.service';
import {ToastController} from '@ionic/angular';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Respuesta} from '../../shared/models/respuesta';
import {Duda} from '../../shared/models/duda';

@Component({
    selector: 'app-formulario-respuesta',
    templateUrl: './formulario-respuesta.component.html',
    styleUrls: ['./formulario-respuesta.component.scss'],
})
export class FormularioRespuestaComponent implements OnInit {

    @Input()
    public dudaId: number;
    public duda: Duda = null;
    @Input()
    public respuestaId: number;
    public usuario: Usuario = null;
    public formResponder: FormGroup;
    public maxlen: 1500;
    @Output()
    public output: EventEmitter<Respuesta> = new EventEmitter<Respuesta>();
    public r: Respuesta = null;

    constructor(protected route: ActivatedRoute, protected dudaService: DudaService, protected toastController: ToastController,
                protected respuestaService: RespuestaService, protected  usuarioService: UsuarioService,
                protected router: Router) {
        this.maxlen = 1500;
    }

    ngOnInit() {
        this.r = new Respuesta();
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
            if (this.respuestaId) {
                this.respuestaService.getRespuestaById(this.respuestaId).subscribe(res => {
                    this.r = res;
                    this.cuerpo.setValue(res.Cuerpo);
                    if (this.r.UsuarioRespuesta.Id !== this.usuario.Id) {
                        this.presentToast('Permiso denegado', 'danger');
                        this.router.navigate(['/foro']);
                    }
                });
            }
        });
        this.formResponder = new FormGroup({
            cuerpo: new FormControl(null, [Validators.required, Validators.maxLength(this.maxlen)])
        });
        if (this.dudaId) {
            this.dudaService.getDudaById(this.dudaId).subscribe(d => {
                this.duda = d;
            });
        }
    }

    get cuerpo(): AbstractControl {
        return this.formResponder.get('cuerpo');
    }

    responder() {
        if (this.formResponder.valid) {
            this.r.Cuerpo = this.cuerpo.value;
            this.r.Duda_oid = this.duda.Id;
            this.r.Usuario_oid = this.usuario.Id;
            console.log(this.r);
            if (this.respuestaId) {
                this.respuestaService.modificar(this.r).subscribe(data => {
                    this.output.emit(data);
                    this.presentToast('Respuesta editada', 'success');
                    this.router.navigate(['/foro/duda/', this.dudaId]);
                });
            } else {
                this.respuestaService.crear(this.r).subscribe(data => {
                    this.output.emit(data);
                    this.cuerpo.reset();
                    this.presentToast('Respuesta enviada', 'success');
                    this.router.navigate(['/foro/duda/', this.dudaId]);
                });
            }
        }
    }

    async presentToast(messagetext, color) {
        const toast = await this.toastController.create({
            message: messagetext,
            duration: 2000,
            color: color
        });
        toast.present();
    }
}
