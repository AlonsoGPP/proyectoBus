import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionItinerarioComponent } from './asignacion-itinerario.component';

describe('AsignacionItinerarioComponent', () => {
  let component: AsignacionItinerarioComponent;
  let fixture: ComponentFixture<AsignacionItinerarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignacionItinerarioComponent]
    });
    fixture = TestBed.createComponent(AsignacionItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
