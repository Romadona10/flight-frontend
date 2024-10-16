import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatwarningComponent } from './seatwarning.component';

describe('SeatwarningComponent', () => {
  let component: SeatwarningComponent;
  let fixture: ComponentFixture<SeatwarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeatwarningComponent]
    });
    fixture = TestBed.createComponent(SeatwarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
