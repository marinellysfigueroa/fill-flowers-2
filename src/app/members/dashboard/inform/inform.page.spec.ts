import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformPage } from './inform.page';

describe('InformPage', () => {
  let component: InformPage;
  let fixture: ComponentFixture<InformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
