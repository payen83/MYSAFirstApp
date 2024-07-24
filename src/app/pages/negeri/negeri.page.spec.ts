import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NegeriPage } from './negeri.page';

describe('NegeriPage', () => {
  let component: NegeriPage;
  let fixture: ComponentFixture<NegeriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NegeriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
