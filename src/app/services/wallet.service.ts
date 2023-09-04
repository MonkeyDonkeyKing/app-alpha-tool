import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  get_wallet(data: any) {
    return this.http.post<any>(this.globalService.host + 'get_wallet', data)
  }

  get_wallets(data: any) {
    return this.http.get<any>(this.globalService.host + 'get_wallets')
  }

  add_wallet(data: any) {
    return this.http.post<any>(this.globalService.host + 'add_wallet', data)
  }
}
