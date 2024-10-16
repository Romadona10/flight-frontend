import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoflightsfoundComponent } from './noflightsfound.component';

describe('NoflightsfoundComponent', () => {
  let component: NoflightsfoundComponent;
  let fixture: ComponentFixture<NoflightsfoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoflightsfoundComponent]
    });
    fixture = TestBed.createComponent(NoflightsfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
