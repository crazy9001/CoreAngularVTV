import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaVideoDetailComponent } from './media-video-detail.component';

describe('MediaVideoDetailComponent', () => {
  let component: MediaVideoDetailComponent;
  let fixture: ComponentFixture<MediaVideoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaVideoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaVideoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
