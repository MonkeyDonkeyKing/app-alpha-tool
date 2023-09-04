import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuratedSettingComponent } from './components/curated-setting/curated-setting.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'curated_settings',
    component: CuratedSettingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
