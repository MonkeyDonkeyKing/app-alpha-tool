import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = {}
  constructor(private walletService: WalletService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  save() {
    this.walletService.add_wallet(this.profile).subscribe(post => {
      this._snackBar.open("Profile Saved!", 'OK', {
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

  get_wallet() {
    this.walletService.get_wallet({ address: this.profile.wallet_id }).subscribe(post => {
      this.profile = post
    }, err => {
      this._snackBar.open(err.error.error, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2
      });
    })
  }
}
