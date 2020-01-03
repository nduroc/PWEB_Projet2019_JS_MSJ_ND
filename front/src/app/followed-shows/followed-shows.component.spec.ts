import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedShowsComponent } from './followed-shows.component';

describe('FollowedShowsComponent', () => {
  let component: FollowedShowsComponent;
  let fixture: ComponentFixture<FollowedShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowedShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
