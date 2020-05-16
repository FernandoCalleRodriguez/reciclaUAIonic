import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { TipoContenedorService } from './../../shared/services/tipo-contenedor.service';
import { Material } from './../../shared/models/material';
import { MaterialService } from 'src/app/shared/services/materiel.service';
import { Component, OnInit } from '@angular/core';
import { ValidacionService } from 'src/app/shared/services/validacion.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.page.html',
  styleUrls: ['./material-list.page.scss'],
})
export class MaterialListPage implements OnInit {

  constructor(private materialService: MaterialService,
    private autenticacionService: AutenticacionService,
    private tipoContenedorService: TipoContenedorService,
    private validacionService: ValidacionService) { }
  materiales: Material[];
  ngOnInit() {
    let userId = (parseInt(this.autenticacionService.getID())!= -1) ? this.autenticacionService.getID() : 65539;
    this.materialService.BuscarMaterialesPorUsuario(userId).subscribe(res => { this.materiales = res })
  }
  getTipo(id) {
    return this.tipoContenedorService.getTipoById(id).Tipo;
  }
  getEstado(id) {
    return this.validacionService.getEstadoById(id).Estado;
  }
}
