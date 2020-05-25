import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {timer} from 'rxjs';
import {LeafletDirective} from '@asymmetrik/ngx-leaflet';
import {Punto} from '../../models/punto';
import {TipoContenedorService} from '../../services/tipo-contenedor.service';
import 'leaflet-easybutton/src/easy-button';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/layers.png';
import 'leaflet/dist/images/layers-2x.png';
import {PlantaPipe} from '../../pipes/planta.pipe';

@Component({
    selector: 'app-mapa-puntos',
    templateUrl: './mapa-puntos.component.html',
    styleUrls: ['./mapa-puntos.component.scss'],
})

export class MapaPuntosComponent implements OnInit {
    public map: L.Map;
    public mlat: number;
    public mlong: number;
    public markers: L.Marker[] = [];
    public position: L.Circle;
    public mtimer = timer(0);
    public actualMarker: L.Marker = null;

    @ViewChild(LeafletDirective)
    public leaflet: LeafletDirective;

    @Input()
    public puntos: Punto[] = [];

    @Input()
    public single = false;

    @Output()
    public selectedPuntoChange: EventEmitter<Punto> = new EventEmitter<Punto>();

    @Output()
    public mapReadyChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(protected tipoContenedorService: TipoContenedorService, protected plantaPipe: PlantaPipe) {
    }

    ngOnInit(): void {
        this.mapReadyChange.emit(false);
    }

    public setUpMap(puntos: Punto[]) {
        this.puntos = puntos;
        this.cleanPoints();
        this.setUpPoints();
        console.log('setup', this.puntos);
    }

    cleanPoints() {
        if (this.markers && this.markers.length > 0) {
            this.markers.forEach(m => {
                this.map.removeLayer(m);
            });
            this.markers = [];
        }
        this.actualMarker = null;
    }

    setUpPoints() {
        if (this.puntos && this.puntos.length > 0) {
            this.single = this.puntos.length === 1;

            this.puntos.forEach(e => {
                this.setMarker(e);
            });

            this.puntos.sort((a, b) => {
                return (this.distance(this.mlat, this.mlong, a.Latitud, a.Longitud))
                    - (this.distance(this.mlat, this.mlong, b.Latitud, b.Longitud));
            });

            if (this.single) {
                this.map.setView(this.markers[0].getLatLng(), 12);
                this.actualMarker = this.markers[0];
            } else {
                this.map.setView(new L.LatLng(this.puntos[0].Latitud, this.puntos[0].Longitud), 19);
            }

            this.refreshLocation();
        }
    }

    public setMarker(punto: Punto) {
        const latlng: L.LatLng = new L.LatLng(punto.Latitud, punto.Longitud);
        const marker = L.marker([latlng.lat, latlng.lng]);
        marker.addTo(this.map).on('click', () => {
            this.infoPunto(marker, punto);
        });
        this.markers.push(marker);
        marker.bindPopup(this.getPopup(punto));
    }

    onMapReady(map: L.Map) {
        this.map = map;
        if (this.puntos && this.puntos.length > 0) {
            this.readyMap();
        } else {
            this.setUpControls();
        }
        this.mapReadyChange.emit(true);
        console.log('ready');
    }

    readyMap() {
        this.setUpControls();
        this.cleanPoints();
        this.setUpPoints();
    }

    setUpControls() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.mlat = position.coords.latitude;
                this.mlong = position.coords.longitude;
                if (!this.single) {
                    this.map.setView(new L.LatLng(this.mlat, this.mlong), 20);
                }
                this.position = this.getCircle();
                this.position.addTo(this.map);
                L.easyButton('fa-user', () => {
                    this.refresh();
                }).addTo(this.map);
                L.easyButton('fa-arrow-right', () => {
                    if (this.puntos && this.puntos.length > 0) {
                        if (!this.actualMarker) {
                            this.actualMarker = this.markers[0];
                        } else {
                            const i = this.markers.indexOf(this.actualMarker);
                            if (i + 1 >= this.markers.length) {
                                this.actualMarker = this.markers[0];
                            } else {
                                this.actualMarker = this.markers[i + 1];
                            }
                        }
                        this.map.setView(this.actualMarker.getLatLng(), this.map.getZoom());
                        // this.actualMarker.openPopup();
                        this.actualMarker.fire('click');
                    }
                }).addTo(this.map);
                L.easyButton('fa-arrow-left', () => {
                    if (this.puntos && this.puntos.length > 0) {
                        if (!this.actualMarker) {
                            this.actualMarker = this.markers[this.markers.length - 1];
                        } else {
                            const i = this.markers.indexOf(this.actualMarker);
                            if (i - 1 < 0) {
                                this.actualMarker = this.markers[this.markers.length - 1];
                            } else {
                                this.actualMarker = this.markers[i - 1];
                            }
                        }
                        this.map.setView(this.actualMarker.getLatLng(), this.map.getZoom());
                        // this.actualMarker.openPopup();
                        this.actualMarker.fire('click');
                    }
                }).addTo(this.map);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxNativeZoom: 19,
                    maxZoom: 30
                }).addTo(this.map);

                this.refreshLocation();
            });
        }
    }

    private getCircle(): L.Circle {
        return L.circle([this.mlat, this.mlong], {color: 'blue', fillColor: 'blue', fillOpacity: 0.3, radius: 8});
    }

    private refreshLocation() {
        this.mtimer.subscribe((value) => {
            this.setSize();
            if (navigator.geolocation && this.map && this.position) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.mlat = position.coords.latitude;
                    this.mlong = position.coords.longitude;
                    this.mtimer = timer(1000);
                    this.map.removeLayer(this.position);
                    this.position = this.getCircle();
                    this.position.addTo(this.map);
                    this.refreshLocation();
                });
            }
        });
    }

    private infoPunto(marker: L.Marker, punto: Punto) {
        this.actualMarker = marker;
        this.selectedPuntoChange.emit(punto);
    }

    public setActualMarker(id: number) {
        if (id) {
            const index = this.puntos.findIndex(p => p.Id == id);
            if (index !== -1 && this.actualMarker != this.markers[index]) {
                this.actualMarker = this.markers[index];
                this.map.setView(this.actualMarker.getLatLng(), 18);
                this.actualMarker.openPopup();
            }
        } else {
            this.refresh();
        }
    }

    private getPopup(punto: Punto): L.Popup {
        let content = `<h4>Punto ${punto.Id}</h4><hr>`;
        content += `<h6>Edificio:</h6>`;
        content += '<ul>';
        content += `<li>${punto.EstanciaPunto.EdificioEstancia.Nombre}</li>`;
        content += `<li>Planta: ${this.plantaPipe.transform(punto.EstanciaPunto.PlantaEstancia.Planta)}</li>`;
        content += `<li>Estancia: ${punto.EstanciaPunto.Id}</li>`;
        content += '</ul>';
        if (punto.Contenedores && punto.Contenedores.length > 0) {
            const atipos = Array(this.tipoContenedorService.getTipos().length).fill(0);
            punto.Contenedores.forEach(c => {
                atipos[c.Tipo - 1]++;
            });
            content += `<h6>Contenedores:</h6>`;
            content += '<ul>';
            atipos.forEach((count, index) => {
                if (count > 0) {
                    content += `<li>${this.tipoContenedorService.getTipoById(index + 1).Tipo} (${count})</li>`;
                }
            });
            content += '</ul>';
        } else {
            content += `<i>No hay contenedores</i>`;
        }
        content += '<hr>';
        content += `${punto.Latitud}, ${punto.Longitud}`;
        return new L.Popup().setContent(content);
    }

    public refresh() {
        this.map.setView(new L.LatLng(this.mlat, this.mlong), 18);
        this.markers.forEach(m => {
            m.closePopup();
        });
        this.actualMarker = null;
    }

    public setSize() {
        if (this.map) {
            this.map.invalidateSize();
        }
    }

    public distance(lat1, lon1, lat2, lon2) {
        // console.log(lat1, lon1, lat2, lon2);
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1);  // this.deg2rad below
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    public deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

}
