import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterDetailComponent } from './tester-detail.component';

describe('TesterDetailComponent', () => {
  let component: TesterDetailComponent;
  let fixture: ComponentFixture<TesterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
