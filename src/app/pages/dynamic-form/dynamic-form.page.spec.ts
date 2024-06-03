import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormPage } from './dynamic-form.page';

describe('DynamicFormPage', () => {
  let component: DynamicFormPage;
  let fixture: ComponentFixture<DynamicFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
