import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedCartComponent } from './fixed-cart.component';

describe('FixedCartComponent', () => {
  let component: FixedCartComponent;
  let fixture: ComponentFixture<FixedCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
