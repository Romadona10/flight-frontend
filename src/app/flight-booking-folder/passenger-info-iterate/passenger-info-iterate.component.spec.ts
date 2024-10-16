import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerInfoIterateComponent } from './passenger-info-iterate.component';

describe('PassengerInfoIterateComponent', () => {
  let component: PassengerInfoIterateComponent;
  let fixture: ComponentFixture<PassengerInfoIterateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengerInfoIterateComponent]
    });
    fixture = TestBed.createComponent(PassengerInfoIterateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
