import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratedListsComponent } from './curated-lists.component';

describe('CuratedListsComponent', () => {
  let component: CuratedListsComponent;
  let fixture: ComponentFixture<CuratedListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuratedListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuratedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
