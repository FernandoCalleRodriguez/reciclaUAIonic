import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeleccionEstanciaPuntoPage } from './seleccion-estancia-punto.page';

describe('SeleccionEstanciaPuntoPage', () => {
  let component: SeleccionEstanciaPuntoPage;
  let fixture: ComponentFixture<SeleccionEstanciaPuntoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionEstanciaPuntoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionEstanciaPuntoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
