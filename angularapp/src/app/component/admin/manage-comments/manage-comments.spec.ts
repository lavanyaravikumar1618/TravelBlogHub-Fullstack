import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageComments } from './manage-comments';

describe('ManageComments', () => {
  let component: ManageComments;
  let fixture: ComponentFixture<ManageComments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageComments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageComments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
