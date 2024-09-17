import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchemaFormPage } from './schema-form.page';

describe('SchemaFormPage', () => {
  let component: SchemaFormPage;
  let fixture: ComponentFixture<SchemaFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
