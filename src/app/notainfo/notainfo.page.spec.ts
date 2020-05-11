import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotainfoPage } from './notainfo.page';

describe('NotainfoPage', () => {
  let component: NotainfoPage;
  let fixture: ComponentFixture<NotainfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotainfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotainfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
