import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMediaVideoComponent } from './modal-media-video.component';

describe('ModalMediaVideoComponent', () => {
  let component: ModalMediaVideoComponent;
  let fixture: ComponentFixture<ModalMediaVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMediaVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMediaVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
