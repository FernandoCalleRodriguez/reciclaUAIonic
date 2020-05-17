import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {Router} from '@angular/router';
import {Usuario} from '../shared/models/usuario';
import {ToastController} from '@ionic/angular';
import {ConfiguracionService} from '../shared/services/configuracion.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    formularioLogin: FormGroup;
    usuario: Usuario;

    constructor(private  autenticacionService: AutenticacionService,
                private  router: Router,
                private configuracionService: ConfiguracionService) {
    }

    ngOnInit() {

        this.formularioLogin = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            pwd: new FormControl(null, [Validators.required]),
        });
    }

    onLogin() {

        this.usuario = {
            Email: this.formularioLogin.value.email,
            Pass: this.formularioLogin.value.pwd,

        };
        console.log(this.usuario.Email);
        console.log(this.usuario.Pass);

        this.autenticacionService.Login(this.usuario).subscribe(
            data => {
                this.router.navigate(['/home']);
            }, error => {
                //this.toaster.error(' Las ceredenciales introducidas no son correctas');
                this.presentToast(' Las ceredenciales introducidas no son correctas', 'danger');
            }
        );
    }

    async presentToast(messagetext, color) {
        this.configuracionService.presentToast(messagetext, color);
    }
}
