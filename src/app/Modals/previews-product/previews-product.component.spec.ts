import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewsProductComponent } from './previews-product.component';

describe('PreviewsProductComponent', () => {
  let component: PreviewsProductComponent;
  let fixture: ComponentFixture<PreviewsProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewsProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
