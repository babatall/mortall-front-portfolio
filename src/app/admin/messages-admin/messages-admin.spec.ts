import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesAdmin } from './messages-admin';

describe('MessagesAdmin', () => {
  let component: MessagesAdmin;
  let fixture: ComponentFixture<MessagesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
