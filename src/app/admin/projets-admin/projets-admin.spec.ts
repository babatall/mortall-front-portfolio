import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetsAdmin } from './projets-admin';

describe('ProjetsAdmin', () => {
  let component: ProjetsAdmin;
  let fixture: ComponentFixture<ProjetsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetsAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
