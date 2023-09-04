import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaListsComponent } from './alpha-lists.component';

describe('AlphaListsComponent', () => {
  let component: AlphaListsComponent;
  let fixture: ComponentFixture<AlphaListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphaListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphaListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
