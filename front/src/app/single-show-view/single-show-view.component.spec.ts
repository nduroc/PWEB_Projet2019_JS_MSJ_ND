import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleShowViewComponent } from './single-show-view.component';

describe('SingleShowViewComponent', () => {
  let component: SingleShowViewComponent;
  let fixture: ComponentFixture<SingleShowViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleShowViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleShowViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
