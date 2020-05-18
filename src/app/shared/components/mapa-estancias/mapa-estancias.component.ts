import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {timer} from 'rxjs';
import {LeafletDirective} from '@asymmetrik/ngx-leaflet';
import {Punto} from '../../models/punto';
import {TipoContenedorService} from '../../services/tipo-contenedor.service';
import {Estancia} from '../../models/estancia';
import {Edificio} from '../../models/edificio';
import {EstanciaService} from '../../services/estancia.service';

@Component({
    selector: 'app-mapa-estancias',
    templateUrl: './mapa-estancias.component.html',
    styleUrls: ['./mapa-estancias.component.scss'],
})
export class MapaEstanciasComponent implements OnInit {
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
    public edificio: Edificio = null;

    @Input()
    public planta: number = null;

    @Input()
    public estancias: Estancia[] = [];

    @Input()
    public single = false;

    @Output()
    public selectedEstanciaChange: EventEmitter<Estancia> = new EventEmitter<Estancia>();

    constructor(protected tipoContenedorService: TipoContenedorService, protected estanciaService: EstanciaService) {
    }

    ngOnInit(): void {
    }

    public setMarker(estancia: Estancia) {
        const latlng: L.LatLng = new L.LatLng(estancia.Latitud, estancia.Longitud);
        const marker = L.marker([latlng.lat, latlng.lng]);
        marker.addTo(this.map).on('click', () => {
            this.infoEstancia(marker, estancia);
        });
        this.markers.push(marker);
        marker.bindPopup(this.getPopup(estancia));
    }

    public setUpMap(edificio: Edificio) {
        this.edificio = edificio;
        this.estanciaService.getEstanciasByEdificio(this.edificio.Id).subscribe(e => {
            this.estancias = e;
            this.setUpPoints();
        });
    }

    onMapReady(map: L.Map) {
        this.map = map;
        if (this.edificio) {
            this.estanciaService.getEstanciasByEdificio(this.edificio.Id).subscribe(e => {
                this.estancias = e;
                if (this.estancias.length > 0) {
                    this.readyMap();
                }
            });
        } else if (this.estancias.length > 0) {
            this.readyMap();
        } else {
            this.setUpControls();
        }
    }

    readyMap() {
        this.setUpControls();
        this.setUpPoints();
    }

    setUpControls() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.mlat = position.coords.latitude;
                this.mlong = position.coords.longitude;
                this.position = this.getCircle();
                this.position.addTo(this.map);
                L.easyButton('fa-user', () => {
                    this.refresh();
                }).addTo(this.map);
                L.easyButton('fa-arrow-right', () => {
                    if (this.estancias && this.estancias.length > 0) {
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
                    if (this.estancias && this.estancias.length > 0) {
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
            });
        }
    }

    setUpPoints() {
        if (this.estancias && this.estancias.length > 0) {
            this.single = this.estancias.length === 1;

            this.cleanPoints();

            this.estancias.forEach(e => {
                if (!this.planta || (this.planta && e.PlantaEstancia.Planta === this.planta)) {
                    this.setMarker(e);
                }
            });

            if (this.single) {
                this.map.setView(this.markers[0].getLatLng(), 12);
                this.actualMarker = this.markers[0];
            }

            this.map.setView(new L.LatLng(this.estancias[0].Latitud, this.estancias[0].Longitud), 19);
            this.refreshLocation();
        }
    }

    cleanPoints() {
        if (this.markers && this.markers.length > 0) {
            this.markers.forEach(m => {
                this.map.removeLayer(m);
            });
        }
        this.actualMarker = null;
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

    private infoEstancia(marker: L.Marker, estancia: Estancia) {
        this.actualMarker = marker;
        this.selectedEstanciaChange.emit(estancia);
    }

    public setActualMarker(id: number) {
        if (id) {
            const index = this.estancias.findIndex(p => p.Id == id);
            if (index !== -1 && this.actualMarker != this.markers[index]) {
                this.actualMarker = this.markers[index];
                this.map.setView(this.actualMarker.getLatLng(), 18);
                this.actualMarker.openPopup();
            }
        } else {
            this.refresh();
        }
    }

    private getPopup(estancia: Estancia): L.Popup {
        let content = `<h4>Punto ${estancia.Id}</h4><hr>`;
        content += '<ul>';
        content += `<li>${estancia.Nombre}</li>`;
        content += `<li>${estancia.Actividad}</li>`;
        content += `<li>${estancia.EdificioEstancia.Nombre}</li>`;
        content += `<li>${estancia.PlantaEstancia.Planta}</li>`;
        content += '</ul>';
        content += '<hr>';
        content += `${estancia.Latitud}, ${estancia.Longitud}`;
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
