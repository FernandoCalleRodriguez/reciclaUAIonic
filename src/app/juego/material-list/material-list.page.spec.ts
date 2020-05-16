import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaterialListPage } from './material-list.page';

describe('MaterialListPage', () => {
  let component: MaterialListPage;
  let fixture: ComponentFixture<MaterialListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
