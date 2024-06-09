import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsFromPage } from './assets-from.page';

describe('AssetsFromPage', () => {
  let component: AssetsFromPage;
  let fixture: ComponentFixture<AssetsFromPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsFromPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
