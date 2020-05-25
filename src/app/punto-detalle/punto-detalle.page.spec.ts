import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PuntoDetallePage } from './punto-detalle.page';

describe('PuntoDetallePage', () => {
  let component: PuntoDetallePage;
  let fixture: ComponentFixture<PuntoDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntoDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PuntoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
