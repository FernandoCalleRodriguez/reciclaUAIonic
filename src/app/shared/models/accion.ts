import {Usuario} from './usuario';
import {Contenedor} from './contenedor';
import {Item} from './item';

export class AccionWeb {
  Id?: number;
  Fecha?: Date;
  Tipo?: TipoAccion;
  UsuarioAccionWeb?: Usuario;
}

export class AccionReciclar {
  Id?: number;
  ItemAccion?: Item;
  ContenedorAccion?: Contenedor;
  Cantidad?: number;
  Fecha?: Date;
  UsuarioAccionReciclar?: Usuario;
  Usuario_oid?: number;
  Item_oid?: number;
  Contenedor_oid?: number;
}

export class TipoAccion {
  Id?: number;
  Puntuacion?: number;
  Acciones?: AccionWeb[];
  Nombre?: string;
}



