export class Estado {
  Id?: number;
  Estado?: string;
  Color?: string;
}

export enum EstadoEnum {
  Validado = 1,
  Pendiente,
  Descartado
}
