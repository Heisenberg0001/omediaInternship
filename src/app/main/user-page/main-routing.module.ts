import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from '../landing-page/landing-page.component';
import { UserPageComponent } from './user-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'loading-page', pathMatch: 'full' },
  { path: 'loading-page', component: LandingPageComponent },
  { path: 'user-page', component: UserPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {}
