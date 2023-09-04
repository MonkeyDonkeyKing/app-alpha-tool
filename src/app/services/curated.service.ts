import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CuratedService {

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  get_curated_setting(data: any) {
    return this.http.post<any>(this.globalService.host + 'get_curated_setting', data)
  }

  get_curated_setting_admin() {
    return this.http.get<any>(this.globalService.host + 'get_curated_setting_admin')
  }

  add_curated_setting(data: any) {
    return this.http.post<any>(this.globalService.host + 'add_curated_setting', data)
  }
}
