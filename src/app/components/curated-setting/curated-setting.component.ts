import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuratedService } from 'src/app/services/curated.service';

@Component({
  selector: 'app-curated-setting',
  templateUrl: './curated-setting.component.html',
  styleUrls: ['./curated-setting.component.css']
})
export class CuratedSettingComponent implements OnInit {
  @Input() profile: any
  curated: any = { list_count: true, floor_price: true, volume: true, twitter_mention: true, set_fp: true, set_tm: true, set_v: true,set_lc: true, discord_bots: [] }
  ranges = [
    { name: '15 Minutes', value: '15_minutes', disable: false },
    { name: '1 Hour', value: '1_hours', disable: true },
    { name: '1 Day', value: '1_days', disable: true },
  ]
  max_discord_bot: number = 3
  constructor(private curatedService: CuratedService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.get_curated()
  }

  add_more_discord() {
    if (this.curated.discord_bots.length < 3)
      this.curated.discord_bots.push({ name: '', channel: '', range: '15_minutes', display_preset: true })
  }
  remove_discord(index: number) {
    this.curated.discord_bots.splice(index, 1)
  }

  discord_change() {
    if (!this.curated.set_discord) {
      this.curated.discord_bots = []
    } else {
      this.curated.discord_bots = [{ name: '', channel: '', range: '15_minutes', display_preset: true }]
    }
  }

  get_curated(){
    this.curatedService.get_curated_setting({wallet: this.profile._id}).subscribe(post => {
      if(post){
        this.curated = post
      }
      this.curated.wallet = this.profile._id
      if(this.curated.discord_bots.length){
        this.curated.set_discord = true
      }
    }, err => {
      this._snackBar.open(err.error.error, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2
      });
    })
  }

  save(){
    this.curatedService.add_curated_setting(this.curated).subscribe(post => {
      this._snackBar.open("Curated Setting Saved!", 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 1000
      });
    }, err => {
      this._snackBar.open(err.error.error, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 1000
      });
    })
  }
}
