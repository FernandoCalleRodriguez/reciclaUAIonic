import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingjuegoPage } from './rankingjuego.page';

describe('RankingjuegoPage', () => {
  let component: RankingjuegoPage;
  let fixture: ComponentFixture<RankingjuegoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingjuegoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingjuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
