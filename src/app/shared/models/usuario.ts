import {Juego} from './juego';

export class Usuario {
    Id?: number;
    Nombre?: string;
    Apellidos?: string;
    Pass?: string;
    Email?: string;
    Fecha?: Date;
    EmailVerificado?: string;
    Borrado?: boolean;
    Puntuacion?: boolean;
    Juego?: Juego;
}


