import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DudaService} from '../../shared/services/duda.service';
import {ToastController} from '@ionic/angular';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';

@Component({
    selector: 'app-editar-respuesta',
    templateUrl: './editar-respuesta.page.html',
    styleUrls: ['./editar-respuesta.page.scss'],
})
export class EditarRespuestaPage implements OnInit {

    public dudaId: number = null;
    public respuestaId: number = null;

    constructor(protected route: ActivatedRoute, protected dudaService: DudaService, protected toastController: ToastController,
                protected respuestaService: RespuestaService, protected  usuarioService: UsuarioService,
                protected router: Router) {
    }

    ngOnInit() {
        this.dudaId = parseInt(this.route.snapshot.paramMap.get('duda'), 10);
        this.respuestaId = parseInt(this.route.snapshot.paramMap.get('respuesta'), 10);
        if (!this.dudaId || !this.respuestaId) {
            this.presentToast('Error al acceder a la respuesta', 'danger');
            this.router.navigate(['/foro']);
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
