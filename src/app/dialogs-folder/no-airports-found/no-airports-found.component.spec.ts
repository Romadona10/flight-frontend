import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAirportsFoundComponent } from './no-airports-found.component';

describe('NoAirportsFoundComponent', () => {
  let component: NoAirportsFoundComponent;
  let fixture: ComponentFixture<NoAirportsFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoAirportsFoundComponent]
    });
    fixture = TestBed.createComponent(NoAirportsFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
