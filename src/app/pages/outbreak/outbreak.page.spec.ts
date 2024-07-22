import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutbreakPage } from './outbreak.page';

describe('OutbreakPage', () => {
  let component: OutbreakPage;
  let fixture: ComponentFixture<OutbreakPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutbreakPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
