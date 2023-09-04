import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-wallet-connect',
  templateUrl: './wallet-connect.component.html',
  styleUrls: ['./wallet-connect.component.css']
})
export class WalletConnectComponent implements OnInit {
  wallets: any = {}
  constructor(
    public dialogRef: MatDialogRef<WalletConnectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.wallets = this.data
  }

  wallet_select(wallet: any) {
    this.dialogRef.close({ wallet_selected: wallet });
  }
}
