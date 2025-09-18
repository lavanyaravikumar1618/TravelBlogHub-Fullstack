import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageArticles } from './manage-articles';

describe('ManageArticles', () => {
  let component: ManageArticles;
  let fixture: ComponentFixture<ManageArticles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageArticles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageArticles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
