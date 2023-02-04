import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotoMainComponent } from './loto-main.component';

describe('LotoMainComponent', () => {
  let component: LotoMainComponent;
  let fixture: ComponentFixture<LotoMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotoMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
