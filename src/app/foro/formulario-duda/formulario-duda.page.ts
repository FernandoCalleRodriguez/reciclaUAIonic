import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DudaService} from '../../shared/services/duda.service';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Duda} from '../../shared/models/duda';
import {TemaService} from '../../shared/services/tema.service';
import {Tema} from '../../shared/models/tema';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-formulario-duda',
    templateUrl: './formulario-duda.page.html',
    styleUrls: ['./formulario-duda.page.scss'],
})
export class FormularioDudaPage implements OnInit {

    public usuario: Usuario = null;
    public formulario: FormGroup = null;
    public duda: Duda = null;
    public tmax: number;
    public bmax: number;
    public edit: boolean;
    public tema: Tema = null;

    constructor(protected route: ActivatedRoute, protected router: Router, protected temaService: TemaService,
                protected dudaService: DudaService, protected  usuarioService: UsuarioService,
                protected toastController: ToastController) {
        this.tmax = 30;
        this.bmax = 1500;
    }

    ngOnInit() {
        this.formulario = new FormGroup({
            titulo: new FormControl(null, [Validators.required, Validators.maxLength(this.tmax)]),
            cuerpo: new FormControl(null, [Validators.required, Validators.maxLength(this.bmax)])
        });
        const ptema = this.route.snapshot.paramMap.get('tema');
        const id = this.route.snapshot.paramMap.get('id');
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
            if (ptema) {
                this.edit = false;
                this.duda = new Duda();
                this.duda.Tema = parseInt(ptema, 10);
                this.tema = this.temaService.getTemaById(this.duda.Tema);
                if (!this.tema) {
                    this.presentToast('Tema no encontrado', 'danger');
                    this.router.navigate(['/foro']);
                }
            } else if (id) {
                this.edit = true;
                this.dudaService.getDudaById(parseInt(id, 10)).subscribe(d => {
                    this.duda = d;
                    if (this.duda.UsuarioDuda.Id !== this.usuario.Id) {
                        this.presentToast('Permiso denegado', 'danger');
                        this.router.navigate(['/foro']);
                    }
                    this.cuerpo.setValue(this.duda.Cuerpo);
                    this.titulo.setValue(this.duda.Titulo);
                    this.tema = this.temaService.getTemaById(this.duda.Tema);
                });
            }
        });
    }

    get cuerpo(): AbstractControl {
        return this.formulario.get('cuerpo');
    }

    get titulo(): AbstractControl {
        return this.formulario.get('titulo');
    }

    onSubmit() {
        if (this.formulario.valid) {
            this.duda.Titulo = this.titulo.value;
            this.duda.Cuerpo = this.cuerpo.value;
            if (this.edit) {
                this.dudaService.modificar(this.duda).subscribe(d => {
                    this.presentToast('Duda editada', 'success');
                    this.router.navigate(['/foro/duda/', d.Id]);
                }, error => {
                    this.presentToast('Error al editar la duda', 'danger');
                });
            } else {
                this.duda.Usuario_oid = this.usuario.Id;
                this.dudaService.crear(this.duda).subscribe(d => {
                    this.presentToast('Duda creada', 'success');
                    this.router.navigate(['/foro/duda/', d.Id]);
                }, error => {
                    this.presentToast('Error al crear la duda', 'danger');
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
