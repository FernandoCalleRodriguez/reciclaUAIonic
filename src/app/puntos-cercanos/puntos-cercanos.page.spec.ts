import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PuntosCercanosPage } from './puntos-cercanos.page';

describe('PuntosCercanosPage', () => {
  let component: PuntosCercanosPage;
  let fixture: ComponentFixture<PuntosCercanosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntosCercanosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PuntosCercanosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
