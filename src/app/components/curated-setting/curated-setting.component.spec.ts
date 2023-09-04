import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratedSettingComponent } from './curated-setting.component';

describe('CuratedSettingComponent', () => {
  let component: CuratedSettingComponent;
  let fixture: ComponentFixture<CuratedSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuratedSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuratedSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
