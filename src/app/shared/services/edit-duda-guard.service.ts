import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UsuarioService} from './usuario.service';
import {DudaService} from './duda.service';
import {ConfiguracionService} from './configuracion.service';
import {TemaService} from './tema.service';

@Injectable({
    providedIn: 'root'
})
export class EditDudaGuardService implements CanActivate {

    constructor(protected usuarioService: UsuarioService, protected dudaService: DudaService,
                protected router: Router, protected config: ConfiguracionService, protected temaService: TemaService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        const ids = route.paramMap.get('id');
        if (ids) {
            const id = parseInt(ids, 10);
            return new Promise((resolve, reject) => {
                this.usuarioService.getLoggedUser().subscribe(u => {
                    this.dudaService.getDudaById(id).subscribe(d => {
                        if (u.Id === d.UsuarioDuda.Id) {
                            resolve(true);
                        } else {
                            this.config.presentToast('Permiso denegado', 'danger');
                            this.router.navigate(['/foro']);
                            resolve(false);
                        }
                    });
                });
            });
        } else {
            const ptema = parseInt(route.paramMap.get('tema'), 10);
            if (this.temaService.getTemaById(ptema) == null) {
                this.config.presentToast('Tema no encontrado', 'danger');
                this.router.navigate(['/foro']);
                return false;
            } else {
                return true;
            }
        }
    }
}
