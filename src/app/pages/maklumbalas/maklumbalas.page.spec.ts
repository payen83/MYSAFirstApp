import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaklumbalasPage } from './maklumbalas.page';

describe('MaklumbalasPage', () => {
  let component: MaklumbalasPage;
  let fixture: ComponentFixture<MaklumbalasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MaklumbalasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
