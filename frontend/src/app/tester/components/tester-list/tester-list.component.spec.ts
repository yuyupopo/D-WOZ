import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesterListComponent } from './tester-list.component';

describe('TesterListComponent', () => {
  let component: TesterListComponent;
  let fixture: ComponentFixture<TesterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
