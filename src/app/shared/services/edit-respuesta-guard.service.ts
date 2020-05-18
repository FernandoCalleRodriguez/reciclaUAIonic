import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from './usuario.service';
import {DudaService} from './duda.service';
import {ConfiguracionService} from './configuracion.service';
import {TemaService} from './tema.service';
import {RespuestaService} from './respuesta.service';
import {Duda} from '../models/duda';

@Injectable({
    providedIn: 'root'
})
export class EditRespuestaGuardService implements CanActivate {

    constructor(protected usuarioService: UsuarioService, protected respuestaService: RespuestaService, protected dudaService: DudaService,
                protected router: Router, protected config: ConfiguracionService, protected temaService: TemaService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        const respuestaId = parseInt(route.paramMap.get('respuesta'), 10);
        const dudaId = parseInt(route.paramMap.get('duda'), 10);
        return new Promise((resolve, reject) => {
            this.usuarioService.getLoggedUser().subscribe(u => {
                this.respuestaService.getRespuestaById(respuestaId).subscribe(r => {
                    if (u.Id === r.UsuarioRespuesta.Id) {
                        resolve(true);
                    } else {
                        this.dudaService.getDudaByRespuesta(r.Id).subscribe(d => {
                            if (d.Id === dudaId) {
                                resolve(true);
                            } else {
                                this.permisoDenegado();
                                resolve(false);
                            }
                        }, error => {
                            this.permisoDenegado();
                            resolve(false);
                        });
                        this.permisoDenegado();
                        resolve(false);
                    }
                }, error => {
                    this.config.presentToast('Respuesta no encontrada', 'danger');
                    this.router.navigate(['/foro']);
                    resolve(false);
                });
            });
        });
    }

    permisoDenegado() {
        this.config.presentToast('Permiso denegado', 'danger');
        this.router.navigate(['/foro']);
    }
}
