import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AlphaService {

  constructor(private http: HttpClient, private globalService: GlobalService) { }

  get_alpha(data: any) {
    return this.http.post<any>(this.globalService.host + 'get_alpha', data)
  }

}
