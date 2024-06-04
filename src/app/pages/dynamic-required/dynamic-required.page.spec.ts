import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicRequiredPage } from './dynamic-required.page';

describe('DynamicRequiredPage', () => {
  let component: DynamicRequiredPage;
  let fixture: ComponentFixture<DynamicRequiredPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicRequiredPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
