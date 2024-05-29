import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoCreateComponent } from './person-create.component';

describe('PersoCreateComponent', () => {
  let component: PersoCreateComponent;
  let fixture: ComponentFixture<PersoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
