import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RetrieveCalculatedStats } from '../interface/retrieve-calculated-stats';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { 
  }

  retrive_calculated_stats(data: RetrieveCalculatedStats) {
    return this.http.post<any>(this.globalService.host + 'retrive_calculated_stats', data)
  }

  get_sol_stats() {
    return this.http.get<any>(this.globalService.host + 'get_sol_stats')
  }

  get_captured_snapshots(data: any) {
    return this.http.post<any>(this.globalService.host + 'get_captured_snapshots', data)
  }
}