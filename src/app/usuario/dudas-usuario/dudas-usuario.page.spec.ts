import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DudasUsuarioPage } from './dudas-usuario.page';

describe('DudasUsuarioPage', () => {
  let component: DudasUsuarioPage;
  let fixture: ComponentFixture<DudasUsuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DudasUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DudasUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
