import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayallnotesComponent } from './displayallnotes.component';

describe('DisplayallnotesComponent', () => {
  let component: DisplayallnotesComponent;
  let fixture: ComponentFixture<DisplayallnotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayallnotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayallnotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
