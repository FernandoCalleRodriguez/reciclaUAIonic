import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotainfodetallePage } from './notainfodetalle.page';

describe('NotainfodetallePage', () => {
  let component: NotainfodetallePage;
  let fixture: ComponentFixture<NotainfodetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotainfodetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotainfodetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
