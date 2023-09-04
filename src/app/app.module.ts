import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FlexLayoutModule } from '@angular/flex-layout'

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips'
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgChartsModule } from 'ng2-charts';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReplaceUnderscoreSpacePipe } from './pipe/replace-underscore-space.pipe';
import { CollectionService } from './services/collection.service';
import { HttpClientModule } from '@angular/common/http';
import { CuratedListsComponent } from './components/curated-lists/curated-lists.component';
import { AlphaListsComponent } from './components/alpha-lists/alpha-lists.component';
import { WalletConnectComponent } from './components/wallet-connect/wallet-connect.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CuratedSettingComponent } from './components/curated-setting/curated-setting.component';
import { OwlModule } from 'ngx-owl-carousel';
import { AlphaDetailsComponent } from './components/alpha-details/alpha-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AlphaListsComponent,
    AlphaDetailsComponent,
    AppComponent,
    CuratedSettingComponent,
    CuratedListsComponent,
    HomepageComponent,
    ProfileComponent,
    ReplaceUnderscoreSpacePipe,
    WalletConnectComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    NgChartsModule,
    OwlModule
  ],
  providers: [
    CollectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
