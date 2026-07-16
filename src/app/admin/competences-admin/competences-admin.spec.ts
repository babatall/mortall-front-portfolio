import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetencesAdmin } from './competences-admin';

describe('CompetencesAdmin', () => {
  let component: CompetencesAdmin;
  let fixture: ComponentFixture<CompetencesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetencesAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetencesAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
