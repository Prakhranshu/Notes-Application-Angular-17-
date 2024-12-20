import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenotesComponent } from './takenotes.component';

describe('TakenotesComponent', () => {
  let component: TakenotesComponent;
  let fixture: ComponentFixture<TakenotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TakenotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
