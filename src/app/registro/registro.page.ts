import {Component, OnInit} from '@angular/core';
import {Usuario} from '../shared/models/usuario';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../shared/services/usuario.service';
import {ConfiguracionService} from '../shared/services/configuracion.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
    usuario: Usuario;
    formularioCrear: FormGroup;


    constructor(private usuarioService: UsuarioService,
                private configuracionService: ConfiguracionService,
                private router: Router) {
    }

    ngOnInit() {

        this.formularioCrear = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email], this.esEmailRepetido.bind(this)),
            pwd: new FormControl(null, [Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
            pwd2: new FormControl(null, [Validators.required,
                Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-_])[A-Za-z\\d$@$!%*?&-_].{7,}$')]),
            name: new FormControl(null, [Validators.required]),
            surname: new FormControl(null, [Validators.required]),
        });
    }

    esEmailRepetido(nombre: FormGroup) {

        return this.configuracionService.esEmailRepetido(nombre.value, this.usuario);

    }

    onRegister() {

        this.usuario = {
            Email: this.formularioCrear.value.email,
            Pass: this.formularioCrear.value.pwd,
            Nombre: this.formularioCrear.value.name,
            Apellidos: this.formularioCrear.value.surname,
        };

        this.usuarioService.CrearUsuario(this.usuario, 'web').subscribe(
            data => {
                if (data === null) {
                    //this.toaster.error(' El Usuario no se ha podido crear vuelva a probar más tarde');
                    console.log(' El Usuario no se ha podido crear vuelva a probar más tarde');

                } else {
                    //this.toaster.success(' El Usuario se ha creado con éxito');
                    this.router.navigate(['/login']);
                    console.log(' El Usuario se ha creado con éxito');

                }

            }, error => {
                //this.toaster.error(' El Usuario no se ha podido crear vuelva a probar más tarde');
                console.log(' El Usuario no se ha podido crear vuelva a probar más tarde' + error);


            }
        );
    }
}
