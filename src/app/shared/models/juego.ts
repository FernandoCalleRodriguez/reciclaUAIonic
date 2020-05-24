import {Usuario} from './usuario';

export class Juego {
    Id?: number;
    ItemActual?: number;
    Aciertos?: number;
    Fallos?: number;
    Puntuacion?: number;
    IntentosItemActual?: number;
    Finalizado?: boolean;
    NivelActual?: number;
    Usuarios_oid?: number;
}
