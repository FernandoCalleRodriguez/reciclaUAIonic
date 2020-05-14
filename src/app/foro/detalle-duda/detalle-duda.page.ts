import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DudaService} from '../../shared/services/duda.service';
import {RespuestaService} from '../../shared/services/respuesta.service';
import {Duda} from '../../shared/models/duda';
import {Respuesta} from '../../shared/models/respuesta';

@Component({
    selector: 'app-detalle-duda',
    templateUrl: './detalle-duda.page.html',
    styleUrls: ['./detalle-duda.page.scss'],
})
export class DetalleDudaPage implements OnInit {

    public duda: Duda = null;
    public respuestas: Respuesta[] = null;

    constructor(protected route: ActivatedRoute, protected dudaService: DudaService,
                protected respuestaService: RespuestaService) {
        const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
        this.dudaService.getDudaById(id).subscribe(d => {
          this.duda = d;
          this.respuestaService.getRespuestasByDuda(this.duda.Id).subscribe(r => {
            this.respuestas = r;
          });
        });
    }

    ngOnInit() {
    }

}
