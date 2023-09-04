import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	host = "https://api.solpix.io/v1/"
	// host = "http://localhost:1000/v1/"
	constructor() { }

}
