import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccionReciclarPage } from './accion-reciclar.page';

describe('AccionReciclarPage', () => {
  let component: AccionReciclarPage;
  let fixture: ComponentFixture<AccionReciclarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccionReciclarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccionReciclarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
