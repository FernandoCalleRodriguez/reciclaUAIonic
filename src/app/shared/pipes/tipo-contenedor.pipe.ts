import {Pipe, PipeTransform} from '@angular/core';
import {PlantaService} from '../services/planta.service';
import {ValidacionService} from '../services/validacion.service';
import {TipoContenedorService} from '../services/tipo-contenedor.service';

@Pipe({
  name: 'tipoContenedor'
})
export class TipoContenedorPipe implements PipeTransform {

  constructor(protected tipos: TipoContenedorService) {
  }

  transform(id: number): string {
    return this.tipos.getTipoById(id).Tipo;
  }

}
