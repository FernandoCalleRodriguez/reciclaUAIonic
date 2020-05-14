import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaDudasPage } from './lista-dudas.page';

describe('ListaDudasPage', () => {
  let component: ListaDudasPage;
  let fixture: ComponentFixture<ListaDudasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDudasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaDudasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
