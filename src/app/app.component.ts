import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletConnectComponent } from './components/wallet-connect/wallet-connect.component';
import { CollectionService } from './services/collection.service';
import { WalletService } from './services/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loader = false
  title = ''
  profile: any = {}
  wallet_id: string = ''
  sol_stats = { crypto: { solana: { usd: '' } }, tps: '' };
  isPhantomInstalled = window.phantom && window.phantom.solana?.isPhantom
  isSolflareInstalled = window.solflare && window.solflare.isSolflare;
  provider: any;
  pressedDisconnected = false;

  constructor(private collectionService: CollectionService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private walletService: WalletService) {
    localStorage.clear();
    // this.provider = this.getProvider();

    this.get_sol_stats()
  }
  ngOnInit(): void {
    localStorage.clear();
  }
  ngOnDestroy(): void {
    localStorage.clear();

  }

  get_sol_stats() {
    this.collectionService.get_sol_stats().subscribe((post: { crypto: { solana: { usd: string; }; }; tps: string; }) => {
      this.sol_stats = post
    })
  }

  getProvider() {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }
    if ('solflare' in window) {
      const provider = window.solflare;
      if (provider.isSolFlare) {
        return provider;
      }
    }
    // window.open('https://phantom.app/', '_blank');
  }

  async connect(wallet: string) {
    this.loader = true
    if (wallet == 'phantom') {
      try {
        const resp = await this.provider.connect();
        this.save(resp.publicKey.toString())
        // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo 
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
        this.loader = false
      }
    }
    if (wallet == 'solflare') {
      try {
        // const solflareProvider = new SolflareProvider(/* pass required parameters here */);
        const resp = await window.solflare.connect();
        this.save(window.solflare.publicKey.toString());
      } catch (err) {
        this.loader = false;
      }
    }
  }

  async disconnect() {
    if (this.provider.isPhantom) {
      this.provider.disconnect();
      // this.wallet_id = this.provider.publicKey.toString()
    }
    else {
      window.solflare.disconnect();
      // this.wallet_id = window.solflare.publicKey.toString();
    }
    this.pressedDisconnected = true;
    await localStorage.clear();
    await this.handleHardReload(window.location.href);
  }

  async handleHardReload(url: RequestInfo | URL) {
    await fetch(url, {
      headers: {
        Pragma: 'no-cache',
        Expires: '-1',
        'Cache-Control': 'no-cache',
      },
    });
    let windowLocation = window.location.href as RequestInfo | URL
    windowLocation = url
    // This is to ensure reload with url's having '#'
    window.location.reload();
  }


  openWalletSelection() {
    const dialogRef = this.dialog.open(WalletConnectComponent,
      {
        data: { phantom: this.isPhantomInstalled, solflare: this.isSolflareInstalled },
      }
    );

    dialogRef.afterClosed().subscribe((result: { wallet_selected: string; }) => {
      if (result.wallet_selected == 'phantom') {
        this.connect(result.wallet_selected)
      }
      if (result.wallet_selected == 'solflare') {
        this.connect(result.wallet_selected)
      }
    });
  }

  save(id: string) {
    this.walletService.add_wallet({ address: id }).subscribe((post: any) => {
      this.wallet_id = id
      this.get_profile()
    }, (err: any) => {
      throw new Error("Failed to add wallet to db ErrMessage: " + err.message);

    })
  }

  get_profile() {
    this.walletService.get_wallet({ address: this.wallet_id }).subscribe((post: { _doc: any; holder_verify: any; }) => {
      this.profile = post._doc
      this.profile.holder_verify = post.holder_verify
      this.loader = false
    }, (err: { error: { error: string; }; }) => {
      this._snackBar.open(err.error.error, 'OK', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2
      });
    })
  }

  onOutletLoaded(component: any) {
    component.profile = this.profile
  }
}
