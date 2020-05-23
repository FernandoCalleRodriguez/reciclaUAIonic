import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {Juego} from '../../shared/models/juego';

@Component({
    selector: 'app-iniciojuego',
    templateUrl: './iniciojuego.page.html',
    styleUrls: ['./iniciojuego.page.scss'],
})
export class IniciojuegoPage implements OnInit {

    // Data passed in by componentProps
    @Input() nivel: number;
    @Input() item: number;
    @Input() niveles: number;
    @Input() items: number;
    @Input() juego: Juego;

    constructor(private route: Router,
                private modalCtrl: ModalController) {
    }

    ngOnInit() {
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

    ranking() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.route.navigate(['/rankingjuego']);
    }
}
