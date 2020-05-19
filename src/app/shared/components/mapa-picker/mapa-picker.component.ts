import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/layers.png';
import 'leaflet/dist/images/layers-2x.png';
import {LeafletDirective} from '@asymmetrik/ngx-leaflet';
import 'leaflet-easybutton/src/easy-button';
import {timer} from 'rxjs';

@Component({
    selector: 'app-mapa-picker',
    templateUrl: './mapa-picker.component.html',
    styleUrls: ['./mapa-picker.component.scss'],
})
export class MapaPickerComponent implements OnInit {
    public map: L.Map;
    public mlat: number;
    public mlong: number;
    public marker: L.Marker;
    public position: L.Circle;
    public zone: L.Circle = null;

    public mtimer = timer(4000);

    @ViewChild(LeafletDirective)
    public leaflet: LeafletDirective;

    @Output() coordinatesChange = new EventEmitter<L.LatLng>();

    constructor() {
    }

    ngOnInit(): void {
    }

    addMarker(e) {
        this.setMarker(e.latlng);
    }

    public setMarker(latlng: L.LatLng) {
        if (this.marker) {
            this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([latlng.lat, latlng.lng]);
        this.marker.addTo(this.map);
        this.coordinatesChange.emit(latlng);
        this.map.flyTo(latlng);
    }

    public deleteMarker() {
        if (this.marker) {
            this.map.removeLayer(this.marker);
            this.map.setView(this.position.getLatLng(), 18);
        }
    }

    onMapReady(map: L.Map) {
        this.map = map;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.mlat = position.coords.latitude;
                this.mlong = position.coords.longitude;
                this.map.setView(new L.LatLng(this.mlat, this.mlong), 18);
                this.position = this.getCircle();
                this.position.addTo(this.map);
                L.easyButton('fa-user', () => {
                    this.map.flyTo(new L.LatLng(this.mlat, this.mlong), 18);
                }).addTo(this.map);
                L.easyButton('fa-map-marker', () => {
                    if (this.zone) {
                        this.map.flyTo(this.zone.getLatLng(), 18);
                    }
                }).addTo(this.map);
            });
        }
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxNativeZoom: 19,
            maxZoom: 30
        }).addTo(this.map);
        this.refreshLocation();
    }

    public setZone(lat: number, long: number) {
        if (this.map) {
            if (this.zone) {
                this.map.removeLayer(this.zone);
            }
            this.zone = this.getCircleCustom(lat, long, 'red');
            this.zone.addTo(this.map);
            this.map.setView(new L.LatLng(lat, long), 20);
        }
    }

    public setSize() {
        if (this.map) {
            this.map.invalidateSize();
        }
    }

    private getCircle(): L.Circle {
        return this.getCircleCustom(this.mlat, this.mlong);
    }

    private getCircleCustom(lat: number, long: number, colors: string = 'blue', radio: number = 8) {
        return L.circle([lat, long], {color: colors, fillColor: colors, fillOpacity: 0.3, radius: radio});
    }

    private refreshLocation() {
        this.mtimer.subscribe((value) => {
            this.setSize();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    this.mlat = position.coords.latitude;
                    this.mlong = position.coords.longitude;
                    this.mtimer = timer(1000);
                    this.refreshLocation();
                });
            }
        });
    }
}
