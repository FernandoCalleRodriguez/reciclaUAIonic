import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutenticacionService} from '../shared/services/autenticacion.service';
import {Router} from '@angular/router';
import {Usuario} from '../shared/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  usuario: Usuario;

  constructor(private  autenticacionService: AutenticacionService,
              private  router: Router,) { }

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

    this.autenticacionService.Login(this.usuario).subscribe(
        data => {
          this.router.navigate(['/home']);
        }, error => {
          //this.toaster.error(' Las ceredenciales introducidas no son correctas');
        }
    );
  }
}
