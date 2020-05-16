import { Material } from './../../shared/models/material';
import { MaterialService } from 'src/app/shared/services/materiel.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.page.html',
  styleUrls: ['./material-list.page.scss'],
})
export class MaterialListPage implements OnInit {

  constructor(private materialService:MaterialService) { }
  materiales:Material[];
  ngOnInit() {
    this.materialService.getMaterial().subscribe(res=>{this.materiales=res})
  }

}
