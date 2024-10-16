import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchflightsComponent } from './searchflights.component';

describe('SearchflightsComponent', () => {
  let component: SearchflightsComponent;
  let fixture: ComponentFixture<SearchflightsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchflightsComponent]
    });
    fixture = TestBed.createComponent(SearchflightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
