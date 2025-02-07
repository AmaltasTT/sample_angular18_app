import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouldComponent } from './mould.component';

describe('MouldComponent', () => {
  let component: MouldComponent;
  let fixture: ComponentFixture<MouldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MouldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MouldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
