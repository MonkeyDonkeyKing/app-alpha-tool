import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlphaService } from 'src/app/services/alpha.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-alpha-details',
	templateUrl: './alpha-details.component.html',
	styleUrls: ['./alpha-details.component.css']
})
export class AlphaDetailsComponent implements OnInit {
	alpha_list: any = {}
	cdn: string = "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/"

	constructor(
		public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) alpha: any, public dialog: MatDialog, private alphaService: AlphaService, public globalService: GlobalService
	) {
		this.alpha_list = alpha
	}





	ngOnInit(): void {

	}





	openInNewTab(url: string) {
		window.open(url, '_blank')
	}
}
