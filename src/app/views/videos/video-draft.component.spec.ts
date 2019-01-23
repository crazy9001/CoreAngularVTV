import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDraftComponent } from './video-draft.component';

describe('VideoDraftComponent', () => {
  let component: VideoDraftComponent;
  let fixture: ComponentFixture<VideoDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
