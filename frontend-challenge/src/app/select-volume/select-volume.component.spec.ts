import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVolumeComponent } from './select-volume.component';

describe('SelectVolumeComponent', () => {
  let component: SelectVolumeComponent;
  let fixture: ComponentFixture<SelectVolumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectVolumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
