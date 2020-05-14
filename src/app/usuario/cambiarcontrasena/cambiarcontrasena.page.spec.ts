import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambiarcontrasenaPage } from './cambiarcontrasena.page';

describe('CambiarcontrasenaPage', () => {
  let component: CambiarcontrasenaPage;
  let fixture: ComponentFixture<CambiarcontrasenaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarcontrasenaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarcontrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
