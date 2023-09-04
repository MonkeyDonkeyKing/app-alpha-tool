import { Time } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { Alpha } from 'src/app/interface/alpha';
import { Collection } from 'src/app/interface/collection';
import { AlphaService } from 'src/app/services/alpha.service';
import { GlobalService } from 'src/app/services/global.service';
import { AlphaDetailsComponent } from '../alpha-details/alpha-details.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-alpha-lists',
  templateUrl: './alpha-lists.component.html',
  styleUrls: ['./alpha-lists.component.css']
})
export class AlphaListsComponent implements OnInit, OnDestroy {
  timeLeft: number = 600;
  interval: any;
  pnl: string = '';
  state = ""
  subscription: Subscription = new Subscription;


  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);
  tooltipContent = "We use artificial intelligence and complex algorithms but most importantly human traders' experience. Our goal is to produce profitable calls with a very high success rate, while focusing on undervalued projects with solid long-term prospects."

  cdn: string = "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/"
  alpha_list: any = []
  is_sorted: boolean = false;
  color_alpha_border: string[] = [
    '300px 10px 60px 30px #fff, 200px 10px 100px 60px #02df63, 200px 0px 140px 90px var(--main-bg-color);',
    '300px 10px 60px 30px #00b7ff, 200px 10px 100px 60px #35f400, 200px 0px 140px 90px var(--main-bg-color);',
    '300px 10px 60px 30px #914b00, 200px 10px 100px 60px #000, 200px 0px 140px 90px var(--main-bg-color);',
    '300px 10px 60px 30px #009124, 200px 10px 100px 60px #00c3ff, 200px 0px 140px 90px var(--main-bg-color);',
  ];
  mySlideOptions = {
    items: 4, dots: true, nav: true, autoplay: false, margin: 5,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1150: {
        items: 3,
      },
      1900: {
        items: 4,
      }

    }
  }

  constructor(public dialog: MatDialog, private alphaService: AlphaService, public globalService: GlobalService, private cdRef: ChangeDetectorRef) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


  ngOnInit(): void {
    this.get_alpha();
    this.getAlphaWithTimer();
  }

  get_alpha() {
    this.alpha_list = []
    this.subscription = this.alphaService.get_alpha({ limit: 20 }).subscribe(post => {
      post.map((alpha: any) => {
        let alpha_doc = alpha

        var date_now: any = new Date(alpha_doc.date);
        var date_future = new Date(alpha_doc.exit_date).getTime(); // get current time

        // get total seconds between the times
        var delta = Math.abs(date_future - date_now) / 1000;

        // calculate (and subtract) whole days
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;

        // calculate (and subtract) whole hours
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        // calculate (and subtract) whole minutes
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        var seconds = delta % 60; // in theory the modulus is not required
        var duration_date = `${days} days, ${hours} hours, ${minutes} minutes, ${Math.floor(
          seconds
        )} seconds.`;

        let p_l = ((Math.trunc(alpha_doc.exit_FP) / 1000000000 - Math.trunc(alpha_doc.call_FP) / 1000000000) / (Math.trunc(alpha_doc.call_FP) / 1000000000) * 100).toFixed(3)
        this.pnl = p_l
        let temp_alpha = {
          name: alpha_doc.alternative_collection ? alpha_doc.alternative_collection : alpha_doc.main_collection.name,
          duration: alpha_doc.duration.length ? alpha_doc.duration.join(" + ") : 'N/A',
          website: alpha_doc.alternative_collection ? alpha_doc.alternative_collection : alpha_doc.main_collection.website,
          discord: alpha_doc.alternative_collection ? alpha_doc.alternative_collection : alpha_doc.main_collection.discord,
          twitter: alpha_doc.alternative_collection ? alpha_doc.alternative_collection : alpha_doc.main_collection.twitter,
          symbol: alpha_doc.alternative_collection ? alpha_doc.alternative_collection : alpha_doc.main_collection.symbol,
          caller: alpha_doc.wallet.username,
          date: alpha_doc.date,
          floor_price: alpha_doc.floor_price,
          note: alpha_doc.note,
          volume_24h: alpha_doc.volume_24h,
          twitter_mentions: alpha_doc.twitter_mentions,
          entry: alpha_doc.entry,
          exit: alpha_doc.exit,
          image: alpha_doc.image,
          profile: alpha_doc.alternative_collection ? null : alpha_doc.main_collection.image,
          project_details: alpha_doc.main_collection.description,
          description: alpha_doc.description,
          risk_analysis: alpha_doc.risk_analysis,
          project_analysis: alpha_doc.project_analysis,
          p_l: p_l,
          duration_date: duration_date,
          call_FP: alpha_doc.call_FP ? (alpha_doc.call_FP / 1000000000).toFixed(3) : 'N/A',
          exit_FP: alpha_doc.exit_FP ? (alpha_doc.exit_FP / 1000000000).toFixed(3) : 'N/A',
          isFinished: alpha_doc.exit_FP !== undefined ? true : false
        }
        this.alpha_list.push(
          temp_alpha
        )
      })
    })
  }

  getAlphaWithTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 600;
        this.get_alpha();
      }
    }, 1000)
  }

  // sort_alpha() {
  //   this.alpha_list.sort((a: any, b: any) => {
  //     if (a.isFinished === b.isFinished) {
  //       return 0;
  //     } else if (a.isFinished) {
  //       return 1;
  //     } else {
  //       return -1;
  //     }
  //   });
  // }

  pauseTimer() {
    clearInterval(this.interval);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  openInNewTab(url: string) {
    window.open(url, '_blank')
  }

  openDialog(alpha: Alpha) {
    let data: Alpha = alpha
    const dialogRef = this.dialog.open(AlphaDetailsComponent, {
      width: '1080px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
