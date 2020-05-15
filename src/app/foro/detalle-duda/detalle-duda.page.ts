import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DudaService} from '../../shared/services/duda.service';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {Duda} from '../../shared/models/duda';
import {Respuesta} from '../../shared/models/respuesta';
import {AutenticacionService} from '../../shared/services/autenticacion.service';
import {UsuarioService} from '../../shared/services/usuario.service';
import {Usuario} from '../../shared/models/usuario';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

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

    constructor(protected route: ActivatedRoute, protected dudaService: DudaService,
                protected respuestaService: RespuestaService, protected  usuarioService: UsuarioService) {
        const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.dudaService.getDudaById(id).subscribe(d => {
            this.duda = d;
            this.respuestaService.getRespuestasByDuda(this.duda.Id).subscribe(r => {
                this.respuestas = r;
            });
        });
        this.maxlen = 1500;
    }

    ngOnInit() {
        this.usuarioService.getLoggedUser().subscribe(u => {
            this.usuario = u;
            console.log(u);
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
                this.respuestas.push(data);
                this.cuerpo.reset();
            });
        }
    }
}
