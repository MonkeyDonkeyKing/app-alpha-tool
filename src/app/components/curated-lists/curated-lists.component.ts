import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { Subscription } from 'rxjs';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-curated-lists',
  templateUrl: './curated-lists.component.html',
  styleUrls: ['./curated-lists.component.css']
})
export class CuratedListsComponent implements OnInit {
  curated_list: any = [];
  cdn: string = "https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/"

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[3]);
  tooltipContent = "This bot takes into consideration the latest changes in FP, volume, listed count and Twitter mentions and generates calls based on the pre-set algorithm. These calls are a great conversation starter and can help you narrow your research."
  subscription: Subscription = new Subscription;


  mySlideOptions = {
    items: 4, dots: true, nav: true, loop: true, autoplay: true, autoplayHoverPause: true, margin: 5,
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

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {

    this.get_captured_snapshots()

    setInterval(() => {
      this.get_captured_snapshots();
    }, 900000)

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  get_captured_snapshots() {
    this.curated_list = []
    this.subscription = this.collectionService.get_captured_snapshots({ limit: 25 }).subscribe(post => {
      post.map((curated: any) => {
        let fp_string = curated.set_fp ? (curated.floor_price ? '🔺 Floor Price' : '🔻 Floor Price') : ''
        let lc_string = curated.set_lc ? (curated.list_count ? '🔺 List Count' : '🔻 List Count') : ''
        let tm_string = curated.set_tm ? (curated.twitter_mention ? '🔺 Twitter Mention' : '🔻 Twitter Mention') : ''
        let v_string = curated.set_v ? (curated.volume ? '🔺 Volume' : '🔻 Volume') : ''

        let algo_preset = fp_string + (fp_string ? '\n' : '') + v_string + (v_string ? '\n' : '');
        let algo_preset2 = tm_string + (tm_string ? '\n' : '') + lc_string + (lc_string ? '\n' : '');
        let temp_curated = {
          // note: 'In the last ' + curated.range.replace('_', ' ') + ', Solpix Algorithm was triggered. Potentially a good call. Check the preset below for more information.',
          note: curated.collections.description,
          date: curated.date,
          duration: curated.type,
          collection: curated.collections.name,
          collections: curated.collections,
          symbol: curated.collections.symbol,
          image: curated.collections.image,
          floor_price: curated.cFP / 1000000000,
          floor_price_percentage: ((Math.trunc(curated.cfp) / 1000000000 - Math.trunc(curated.oFP) / 1000000000) / (Math.trunc(curated.oFP) / 1000000000) * 100),
          listed: curated.cLC,
          listed_percentage: (curated.cLC - curated.oLC) / curated.oLC * 100,
          volume: Math.trunc(curated.cV) / 1000000000,
          volume_percentage: Math.trunc(curated.cV) == 0 || Math.trunc(curated.oV) == 0 ? 0 : ((Math.trunc(curated.cV) / 1000000000 - Math.trunc(curated.oV) / 1000000000) / (Math.trunc(curated.oV) / 1000000000)),
          mentions: curated.collections.twitter ? curated.cTM : 0,
          mentions_percentage: curated.collections.twitter ? (curated.cTM == 0 || curated.oTM == 0) ? 0 : (curated.cTM - curated.oTM) / curated.oTM * 100 : 0,
          algo_preset: algo_preset,
          algo_preset2: algo_preset2
        }

        this.curated_list.push(
          temp_curated
        )
      })
    })
  }

  openInNewTab(url: string) {
    window.open(url, '_blank')
  }
}
