import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarRespuestaPage } from './editar-respuesta.page';

describe('EditarRespuestaPage', () => {
  let component: EditarRespuestaPage;
  let fixture: ComponentFixture<EditarRespuestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRespuestaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarRespuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
