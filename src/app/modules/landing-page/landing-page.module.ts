import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './components/landing-page.component';
import { LandingPageRouterModule } from './landing-page-router.module';

@NgModule({
  declarations: [ LandingPageComponent ],
  imports: [
    CommonModule,
    FormsModule,
    LandingPageRouterModule
  ],
  bootstrap: [ LandingPageComponent ]
})

export class LandingPageModule {
}
