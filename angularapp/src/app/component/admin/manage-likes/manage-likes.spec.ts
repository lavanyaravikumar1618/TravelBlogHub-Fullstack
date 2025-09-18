import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLikes } from './manage-likes';

describe('ManageLikes', () => {
  let component: ManageLikes;
  let fixture: ComponentFixture<ManageLikes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLikes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageLikes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
