import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaDetailsComponent } from './alpha-details.component';

describe('CollectionDetailsComponent', () => {
	let component: AlphaDetailsComponent;
	let fixture: ComponentFixture<AlphaDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AlphaDetailsComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(AlphaDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
