import { CameraService } from './../../shared/services/camera.service';
import { Material } from './../../shared/models/material';
import { Item } from './../../shared/models/item';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/shared/services/materiel.service';
import { TipoContenedorService } from 'src/app/shared/services/tipo-contenedor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { AutenticacionService } from 'src/app/shared/services/autenticacion.service';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.page.html',
    styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
    title="Crear item"
    selectedImg: any;
    itemForm: FormGroup;
    item: Item;
    materiales: Material[];
    isEdit = false;
    constructor(
        public actionSheetController: ActionSheetController,
        private cameraService: CameraService,
        private materialService: MaterialService,
        private itemService: ItemService,
        private tipoContenedores: TipoContenedorService,
        private activeRouter: ActivatedRoute,
        private router: Router,
        private toastController: ToastController,
        private autenticacionService: AutenticacionService) {
    }

    ngOnInit() {
        this.itemForm = new FormGroup({
            Nombre: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            Descripcion: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(250)]),
            Material_oid: new FormControl(null, [Validators.required]),
        });
        const id = this.activeRouter.snapshot.paramMap.get('id');
        if (id) {
            this.title="Modificar item"
            this.isEdit = true;
            this.itemService.getById(parseInt(id, 10)).subscribe(res => {
                if (res == null) return;
                this.item = res;
                this.Nombre.setValue(res.Nombre)
                this.Descripcion.setValue(res.Descripcion)
                this.Material_oid.setValue(res.MaterialItem.Contenedor)
                console.log(this.itemForm.value)

            });

        }
        this.item = new Item();
        this.materialService.getMaterial().subscribe(res => {
            this.materiales = res;
        });

    }
    get Nombre() {
        return this.itemForm.get('Nombre')
    }
    get Descripcion() {
        return this.itemForm.get('Descripcion')
    }
    get Material_oid() {
        return this.itemForm.get('Material_oid')
    }
    createItem() {
        const id =parseInt( this.activeRouter.snapshot.paramMap.get('id'),10);
        this.item.Nombre = this.itemForm.value.Nombre;
        this.item.Descripcion = this.itemForm.value.Descripcion;
        this.item.Material_oid = parseInt(this.itemForm.value.Material_oid);
        this.item.Usuario_oid = parseInt(this.autenticacionService.getID());
        this.item.Imagen = this.selectedImg != null ? this.selectedImg : "";

        if (this.isEdit) {
            this.item.Id=id;
            this.itemService.updateItem(this.item).subscribe(res => {
                if (res != null) {
                    this.uploadImage(res.Id);
                }
                this.presentToast(' Item modificado Correctamente', 'success');
                this.itemForm.reset();
            });
        } else {
            this.itemService.setItem(this.item).subscribe(res => {
                if (res != null) {
                    this.uploadImage(res.Id);
                }
                this.presentToast(' Item Creado Correctamente', 'success');
                this.itemForm.reset();
            });
        }
        this.isEdit=false
        this.router.navigate(['/propuestas']);
    }

    takePic() {
        this.cameraService.takePicture().then((imageData) => {
            // Do something with the new
            this.selectedImg = 'data:image/jpeg;base64,' + imageData;
            this.item.Imagen = imageData;
        }, (err) => {
            // Handle error
            console.log('Camera issue: ' + err);
        });
        ;
    }

    getPic() {
        this.cameraService.getPicture().then((imageData) => {
            // Do something with the new
            this.selectedImg = 'data:image/jpeg;base64,' + imageData;
            this.item.Imagen = imageData;
        }, (err) => {
            // Handle error
            console.log('Camera issue: ' + err);
        });
        ;
    }

    async presentToast(messagetext, color) {
        const toast = await this.toastController.create({
            message: messagetext,
            duration: 2000,
            color: color

        });
        toast.present();
    }


    async presentActionSheet() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Imagen',
            buttons: [{
                text: 'Desde Camera',
                role: 'destructive',
                icon: 'camera-outline',
                handler: () => {
                    this.takePic();
                }
            }, {
                text: 'Desde Geleria',
                icon: 'images-outline',
                handler: () => {
                    this.getPic();
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    this.selectedImg = null;
                    this.item.Imagen = '';
                }
            }]
        });
        await actionSheet.present();
    }

    uploadImage(id) {
        if (this.selectedImg != null) {
            const fd = new FormData();
            fd.append('img', this.selectedImg, this.selectedImg.name);
            this.itemService.uploadImage(fd, id).subscribe(res => {
            });
        }
    }

}
