import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaytoutComponent } from './laytout.component';

describe('LaytoutComponent', () => {
  let component: LaytoutComponent;
  let fixture: ComponentFixture<LaytoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaytoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaytoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
